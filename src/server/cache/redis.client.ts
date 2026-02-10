// Redis client singleton with lazy connection
// Optimized for serverless environments

import { redis as redisConfig, isDev } from '../config/env.server';

// Types
export interface RedisClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, options?: SetOptions): Promise<'OK'>;
    del(...keys: string[]): Promise<number>;
    exists(...keys: string[]): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    ttl(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    incr(key: string): Promise<number>;
    decr(key: string): Promise<number>;
    hget(key: string, field: string): Promise<string | null>;
    hset(key: string, field: string, value: string): Promise<number>;
    hgetall(key: string): Promise<Record<string, string>>;
    hdel(key: string, ...fields: string[]): Promise<number>;
    lpush(key: string, ...values: string[]): Promise<number>;
    rpush(key: string, ...values: string[]): Promise<number>;
    lpop(key: string): Promise<string | null>;
    rpop(key: string): Promise<string | null>;
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    sadd(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    srem(key: string, ...members: string[]): Promise<number>;
    ping(): Promise<string>;
    quit(): Promise<void>;
    disconnect(): void;
}

export interface SetOptions {
    ex?: number; // Expire time in seconds
    px?: number; // Expire time in milliseconds
    nx?: boolean; // Only set if key doesn't exist
    xx?: boolean; // Only set if key exists
}

// Redis instance holder
let redisInstance: RedisClient | null = null;
let connectionPromise: Promise<RedisClient> | null = null;

// Lazy connection - only connects when first used
export async function getRedis(): Promise<RedisClient> {
    if (redisInstance) {
        return redisInstance;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = createRedisClient();
    redisInstance = await connectionPromise;
    connectionPromise = null;

    return redisInstance;
}

// Create Redis client
async function createRedisClient(): Promise<RedisClient> {
    // Dynamic import for ioredis
    const { default: Redis } = await import('ioredis');

    const client = new Redis(redisConfig.url, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
            if (times > 3) {
                console.error('[Redis] Max retries reached, giving up');
                return null;
            }
            const delay = Math.min(times * 200, 2000);
            console.warn(`[Redis] Retry attempt ${times}, waiting ${delay}ms`);
            return delay;
        },
        reconnectOnError(err) {
            const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT'];
            return targetErrors.some((e) => err.message.includes(e));
        },
        lazyConnect: true, // Don't connect until first command
        enableReadyCheck: true,
        connectTimeout: 10000,
    });

    // Event handlers
    client.on('connect', () => {
        if (isDev) console.log('[Redis] Connected');
    });

    client.on('ready', () => {
        if (isDev) console.log('[Redis] Ready');
    });

    client.on('error', (err) => {
        console.error('[Redis] Error:', err.message);
    });

    client.on('close', () => {
        if (isDev) console.log('[Redis] Connection closed');
    });

    // Connect
    await client.connect();

    // Return wrapped client
    return {
        get: (key) => client.get(key),
        set: async (key, value, options) => {
            const args: (string | number)[] = [key, value];
            if (options?.ex) args.push('EX', options.ex);
            if (options?.px) args.push('PX', options.px);
            if (options?.nx) args.push('NX');
            if (options?.xx) args.push('XX');
            return client.set(...(args as [string, string, ...any[]])) as Promise<'OK'>;
        },
        del: (...keys) => client.del(...keys),
        exists: (...keys) => client.exists(...keys),
        expire: (key, seconds) => client.expire(key, seconds),
        ttl: (key) => client.ttl(key),
        keys: (pattern) => client.keys(pattern),
        incr: (key) => client.incr(key),
        decr: (key) => client.decr(key),
        hget: (key, field) => client.hget(key, field),
        hset: (key, field, value) => client.hset(key, field, value),
        hgetall: (key) => client.hgetall(key),
        hdel: (key, ...fields) => client.hdel(key, ...fields),
        lpush: (key, ...values) => client.lpush(key, ...values),
        rpush: (key, ...values) => client.rpush(key, ...values),
        lpop: (key) => client.lpop(key),
        rpop: (key) => client.rpop(key),
        lrange: (key, start, stop) => client.lrange(key, start, stop),
        sadd: (key, ...members) => client.sadd(key, ...members),
        smembers: (key) => client.smembers(key),
        srem: (key, ...members) => client.srem(key, ...members),
        ping: () => client.ping(),
        quit: async () => {
            await client.quit();
            redisInstance = null;
        },
        disconnect: () => {
            client.disconnect();
            redisInstance = null;
        },
    };
}

// Graceful shutdown
export async function disconnectRedis(): Promise<void> {
    if (redisInstance) {
        await redisInstance.quit();
        redisInstance = null;
    }
}

// Check if connected
export function isRedisConnected(): boolean {
    return redisInstance !== null;
}
