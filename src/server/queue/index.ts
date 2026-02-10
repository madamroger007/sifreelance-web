// Queue module exports
export { getRabbitMQ, disconnectRabbitMQ, isRabbitMQConnected } from './rabbitmq.client';
export type {
    RabbitMQConnection,
    RabbitMQChannel,
    QueueOptions,
    ExchangeOptions,
    PublishOptions,
    ConsumeOptions,
    ConsumeMessage,
    ExchangeType,
} from './rabbitmq.client';

export {
    Queue,
    Exchange,
    createMessage,
    getProducer,
    getConsumer,
    sendToQueue,
    publishEvent,
    closeQueue,
} from './queue.service';
export type {
    QueueMessage,
    QueueProducer,
    QueueConsumer,
    ConsumerOptions,
    MessageHandler,
} from './queue.service';
