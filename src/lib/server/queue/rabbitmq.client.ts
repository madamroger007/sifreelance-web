// RabbitMQ connection manager
// Handles connection, reconnection, and channel management

import { rabbitmq as rabbitmqConfig, isDev } from '../config/env.server';

// Types
export interface RabbitMQConnection {
    createChannel(): Promise<RabbitMQChannel>;
    close(): Promise<void>;
    isConnected(): boolean;
}

export interface RabbitMQChannel {
    assertQueue(
        queue: string,
        options?: QueueOptions
    ): Promise<{ queue: string; messageCount: number; consumerCount: number }>;
    assertExchange(exchange: string, type: ExchangeType, options?: ExchangeOptions): Promise<void>;
    bindQueue(queue: string, exchange: string, routingKey: string): Promise<void>;
    sendToQueue(queue: string, content: Buffer, options?: PublishOptions): boolean;
    publish(exchange: string, routingKey: string, content: Buffer, options?: PublishOptions): boolean;
    consume(
        queue: string,
        callback: (msg: ConsumeMessage | null) => void,
        options?: ConsumeOptions
    ): Promise<{ consumerTag: string }>;
    ack(message: ConsumeMessage, allUpTo?: boolean): void;
    nack(message: ConsumeMessage, allUpTo?: boolean, requeue?: boolean): void;
    prefetch(count: number): Promise<void>;
    close(): Promise<void>;
    cancel(consumerTag: string): Promise<void>;
}

export interface QueueOptions {
    durable?: boolean;
    exclusive?: boolean;
    autoDelete?: boolean;
    deadLetterExchange?: string;
    deadLetterRoutingKey?: string;
    messageTtl?: number;
    maxLength?: number;
}

export interface ExchangeOptions {
    durable?: boolean;
    autoDelete?: boolean;
    internal?: boolean;
}

export interface PublishOptions {
    persistent?: boolean;
    contentType?: string;
    contentEncoding?: string;
    headers?: Record<string, unknown>;
    priority?: number;
    correlationId?: string;
    replyTo?: string;
    expiration?: string;
    messageId?: string;
    timestamp?: number;
    type?: string;
    appId?: string;
}

export interface ConsumeOptions {
    noAck?: boolean;
    exclusive?: boolean;
    priority?: number;
}

export interface ConsumeMessage {
    content: Buffer;
    fields: {
        deliveryTag: number;
        redelivered: boolean;
        exchange: string;
        routingKey: string;
    };
    properties: PublishOptions;
}

export type ExchangeType = 'direct' | 'topic' | 'fanout' | 'headers';

// Connection state
let connection: RabbitMQConnection | null = null;
let connectionPromise: Promise<RabbitMQConnection> | null = null;
let isShuttingDown = false;

// Get or create connection
export async function getRabbitMQ(): Promise<RabbitMQConnection> {
    if (isShuttingDown) {
        throw new Error('[RabbitMQ] Connection is shutting down');
    }

    if (connection && connection.isConnected()) {
        return connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = createConnection();
    connection = await connectionPromise;
    connectionPromise = null;

    return connection;
}

// Create connection with retry logic
async function createConnection(): Promise<RabbitMQConnection> {
    const { default: amqp } = await import('amqplib');

    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
        try {
            if (isDev) console.log(`[RabbitMQ] Connecting... (attempt ${retries + 1})`);

            const conn = await amqp.connect(rabbitmqConfig.url);

            conn.on('error', (err) => {
                console.error('[RabbitMQ] Connection error:', err.message);
            });

            conn.on('close', () => {
                if (!isShuttingDown) {
                    console.warn('[RabbitMQ] Connection closed, will reconnect on next use');
                    connection = null;
                }
            });

            if (isDev) console.log('[RabbitMQ] Connected');

            return {
                async createChannel(): Promise<RabbitMQChannel> {
                    const ch = await conn.createChannel();

                    ch.on('error', (err) => {
                        console.error('[RabbitMQ] Channel error:', err.message);
                    });

                    ch.on('close', () => {
                        if (isDev) console.log('[RabbitMQ] Channel closed');
                    });

                    return {
                        async assertQueue(queue, options) {
                            const result = await ch.assertQueue(queue, options);
                            return result;
                        },
                        async assertExchange(exchange, type, options) {
                            await ch.assertExchange(exchange, type, options);
                        },
                        async bindQueue(queue, exchange, routingKey) {
                            await ch.bindQueue(queue, exchange, routingKey);
                        },
                        sendToQueue(queue, content, options) {
                            return ch.sendToQueue(queue, content, options);
                        },
                        publish(exchange, routingKey, content, options) {
                            return ch.publish(exchange, routingKey, content, options);
                        },
                        async consume(queue, callback, options) {
                            return ch.consume(queue, callback, options);
                        },
                        ack(message, allUpTo) {
                            ch.ack(message as any, allUpTo);
                        },
                        nack(message, allUpTo, requeue) {
                            ch.nack(message as any, allUpTo, requeue);
                        },
                        async prefetch(count) {
                            await ch.prefetch(count);
                        },
                        async close() {
                            await ch.close();
                        },
                        async cancel(consumerTag) {
                            await ch.cancel(consumerTag);
                        },
                    };
                },
                async close() {
                    isShuttingDown = true;
                    await conn.close();
                    connection = null;
                    isShuttingDown = false;
                },
                isConnected() {
                    return conn !== null;
                },
            };
        } catch (err) {
            retries++;
            const error = err as Error;
            console.error(`[RabbitMQ] Connection failed: ${error.message}`);

            if (retries >= maxRetries) {
                throw new Error(`[RabbitMQ] Failed to connect after ${maxRetries} attempts`);
            }

            const delay = Math.min(1000 * Math.pow(2, retries), 30000);
            console.log(`[RabbitMQ] Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw new Error('[RabbitMQ] Connection failed');
}

// Graceful shutdown
export async function disconnectRabbitMQ(): Promise<void> {
    if (connection) {
        await connection.close();
        connection = null;
    }
}

// Check if connected
export function isRabbitMQConnected(): boolean {
    return connection !== null && connection.isConnected();
}
