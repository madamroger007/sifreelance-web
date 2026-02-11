// Queue service abstraction
// Domain-agnostic message queue interface

import {
    getRabbitMQ,
    type RabbitMQChannel,
    type PublishOptions,
    type ConsumeMessage,
    type QueueOptions,
} from './rabbitmq.client';
import { isDev } from '../config/env.server';

// Queue names
export const Queue = {
    // Email notifications
    EMAIL: 'email',
    EMAIL_DLQ: 'email.dlq',

    // Project events
    PROJECT_CREATED: 'project.created',
    PROJECT_UPDATED: 'project.updated',
    PROJECT_DELETED: 'project.deleted',

    // Finance events
    FINANCE_CREATED: 'finance.created',

    // Schedule events
    SCHEDULE_REMINDER: 'schedule.reminder',

    // General
    NOTIFICATIONS: 'notifications',
} as const;

// Exchange names
export const Exchange = {
    EVENTS: 'events',
    NOTIFICATIONS: 'notifications',
} as const;

// Message types
export interface QueueMessage<T = unknown> {
    type: string;
    payload: T;
    metadata: {
        id: string;
        timestamp: number;
        version: number;
        source: string;
    };
}

// Producer interface
export interface QueueProducer {
    send<T>(queue: string, message: QueueMessage<T>, options?: PublishOptions): Promise<boolean>;
    publish<T>(
        exchange: string,
        routingKey: string,
        message: QueueMessage<T>,
        options?: PublishOptions
    ): Promise<boolean>;
    close(): Promise<void>;
}

// Consumer interface
export interface QueueConsumer {
    subscribe<T>(
        queue: string,
        handler: MessageHandler<T>,
        options?: ConsumerOptions
    ): Promise<string>;
    unsubscribe(consumerTag: string): Promise<void>;
    close(): Promise<void>;
}

export interface ConsumerOptions {
    prefetch?: number;
    noAck?: boolean;
    deadLetterQueue?: string;
}

export type MessageHandler<T> = (
    message: QueueMessage<T>,
    ack: () => void,
    nack: (requeue?: boolean) => void
) => Promise<void>;

// Create a unique message ID
function createMessageId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// Create queue message
export function createMessage<T>(type: string, payload: T, source: string = 'sifreelance'): QueueMessage<T> {
    return {
        type,
        payload,
        metadata: {
            id: createMessageId(),
            timestamp: Date.now(),
            version: 1,
            source,
        },
    };
}

// Producer implementation
async function createProducer(): Promise<QueueProducer> {
    const rabbitmq = await getRabbitMQ();
    const channel = await rabbitmq.createChannel();

    // Setup default exchanges
    await channel.assertExchange(Exchange.EVENTS, 'topic', { durable: true });
    await channel.assertExchange(Exchange.NOTIFICATIONS, 'direct', { durable: true });

    return {
        async send<T>(queue: string, message: QueueMessage<T>, options?: PublishOptions): Promise<boolean> {
            // Ensure queue exists
            await channel.assertQueue(queue, {
                durable: true,
                deadLetterExchange: '',
                deadLetterRoutingKey: `${queue}.dlq`,
            });

            const content = Buffer.from(JSON.stringify(message));
            const result = channel.sendToQueue(queue, content, {
                persistent: true,
                contentType: 'application/json',
                messageId: message.metadata.id,
                timestamp: message.metadata.timestamp,
                ...options,
            });

            if (isDev) {
                console.log(`[Queue] Sent to ${queue}:`, message.type);
            }

            return result;
        },

        async publish<T>(
            exchange: string,
            routingKey: string,
            message: QueueMessage<T>,
            options?: PublishOptions
        ): Promise<boolean> {
            const content = Buffer.from(JSON.stringify(message));
            const result = channel.publish(exchange, routingKey, content, {
                persistent: true,
                contentType: 'application/json',
                messageId: message.metadata.id,
                timestamp: message.metadata.timestamp,
                ...options,
            });

            if (isDev) {
                console.log(`[Queue] Published to ${exchange}/${routingKey}:`, message.type);
            }

            return result;
        },

        async close(): Promise<void> {
            await channel.close();
        },
    };
}

// Consumer implementation
async function createConsumer(): Promise<QueueConsumer> {
    const rabbitmq = await getRabbitMQ();
    const channel = await rabbitmq.createChannel();
    const consumerTags: string[] = [];

    return {
        async subscribe<T>(
            queue: string,
            handler: MessageHandler<T>,
            options?: ConsumerOptions
        ): Promise<string> {
            // Set prefetch
            await channel.prefetch(options?.prefetch ?? 1);

            // Setup queue with DLQ
            const queueOptions: QueueOptions = {
                durable: true,
            };

            if (options?.deadLetterQueue) {
                // Create DLQ first
                await channel.assertQueue(options.deadLetterQueue, { durable: true });
                queueOptions.deadLetterExchange = '';
                queueOptions.deadLetterRoutingKey = options.deadLetterQueue;
            }

            await channel.assertQueue(queue, queueOptions);

            // Subscribe
            const { consumerTag } = await channel.consume(
                queue,
                async (msg: ConsumeMessage | null) => {
                    if (!msg) return;

                    try {
                        const message = JSON.parse(msg.content.toString()) as QueueMessage<T>;

                        if (isDev) {
                            console.log(`[Queue] Received from ${queue}:`, message.type);
                        }

                        await handler(
                            message,
                            () => channel.ack(msg),
                            (requeue = false) => channel.nack(msg, false, requeue)
                        );
                    } catch (err) {
                        const error = err as Error;
                        console.error(`[Queue] Error processing message from ${queue}:`, error.message);
                        channel.nack(msg, false, false); // Don't requeue, send to DLQ
                    }
                },
                { noAck: options?.noAck ?? false }
            );

            consumerTags.push(consumerTag);

            if (isDev) {
                console.log(`[Queue] Subscribed to ${queue} (tag: ${consumerTag})`);
            }

            return consumerTag;
        },

        async unsubscribe(consumerTag: string): Promise<void> {
            await channel.cancel(consumerTag);
            const index = consumerTags.indexOf(consumerTag);
            if (index > -1) {
                consumerTags.splice(index, 1);
            }
        },

        async close(): Promise<void> {
            // Cancel all consumers
            for (const tag of consumerTags) {
                await channel.cancel(tag).catch(() => { });
            }
            await channel.close();
        },
    };
}

// Singleton instances
let producerInstance: QueueProducer | null = null;
let consumerInstance: QueueConsumer | null = null;

// Get producer (lazy initialization)
export async function getProducer(): Promise<QueueProducer> {
    if (!producerInstance) {
        producerInstance = await createProducer();
    }
    return producerInstance;
}

// Get consumer (lazy initialization)
export async function getConsumer(): Promise<QueueConsumer> {
    if (!consumerInstance) {
        consumerInstance = await createConsumer();
    }
    return consumerInstance;
}

// Convenience: Send message to queue
export async function sendToQueue<T>(queue: string, type: string, payload: T): Promise<boolean> {
    const producer = await getProducer();
    const message = createMessage(type, payload);
    return producer.send(queue, message);
}

// Convenience: Publish event
export async function publishEvent<T>(routingKey: string, type: string, payload: T): Promise<boolean> {
    const producer = await getProducer();
    const message = createMessage(type, payload);
    return producer.publish(Exchange.EVENTS, routingKey, message);
}

// Cleanup
export async function closeQueue(): Promise<void> {
    if (producerInstance) {
        await producerInstance.close();
        producerInstance = null;
    }
    if (consumerInstance) {
        await consumerInstance.close();
        consumerInstance = null;
    }
}
