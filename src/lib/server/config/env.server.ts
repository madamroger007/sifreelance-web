// Server-side environment configuration
// Validates and exports typed environment variables

import { env } from '$env/dynamic/private';

// Environment type
export type Environment = 'development' | 'production' | 'test';

// Get current environment
export const NODE_ENV: Environment = (env.NODE_ENV as Environment) || 'development';
export const isDev = NODE_ENV === 'development';
export const isProd = NODE_ENV === 'production';
export const isTest = NODE_ENV === 'test';

// Database configuration
export const database = {
    url: env.DATABASE_URL || '',
    directUrl: env.DIRECT_URL || env.DATABASE_URL || '',
} as const;

// Redis configuration
export const redis = {
    url: env.REDIS_URL || 'redis://localhost:6379',
    // Parse URL for granular access if needed
    get host() {
        try {
            const url = new URL(this.url);
            return url.hostname;
        } catch {
            return 'localhost';
        }
    },
    get port() {
        try {
            const url = new URL(this.url);
            return parseInt(url.port) || 6379;
        } catch {
            return 6379;
        }
    },
    get password() {
        try {
            const url = new URL(this.url);
            return url.password || undefined;
        } catch {
            return undefined;
        }
    },
} as const;

// RabbitMQ configuration
export const rabbitmq = {
    url: env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672/',
    // Connection options
    get isSecure() {
        return this.url.startsWith('amqps://');
    },
} as const;

// Validate required environment variables
export function validateEnv(): void {
    const required: string[] = ['DATABASE_URL'];
    const missing = required.filter((key) => !env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

// Export all config as a single object
export const serverEnv = {
    NODE_ENV,
    isDev,
    isProd,
    isTest,
    database,
    redis,
    rabbitmq,
} as const;

export default serverEnv;
