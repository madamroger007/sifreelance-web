// Cache service abstraction
// Domain-agnostic caching interface

import { getRedis, type RedisClient } from './redis.client';

// Cache key prefixes for different domains
export const CachePrefix = {
    USER: 'user:',
    SESSION: 'session:',
    PROJECT: 'project:',
    FINANCE: 'finance:',
    SCHEDULE: 'schedule:',
    RATE_LIMIT: 'ratelimit:',
    TEMP: 'temp:',
} as const;

// Default TTL values (in seconds)
export const CacheTTL = {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    DAY: 86400, // 24 hours
    WEEK: 604800, // 7 days
} as const;

// Cache service interface
export interface CacheService {
    // Basic operations
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;

    // Pattern operations
    delPattern(pattern: string): Promise<number>;

    // Atomic operations
    incr(key: string, ttlSeconds?: number): Promise<number>;
    decr(key: string): Promise<number>;

    // Hash operations
    hget<T>(key: string, field: string): Promise<T | null>;
    hset<T>(key: string, field: string, value: T): Promise<void>;
    hgetall<T>(key: string): Promise<Record<string, T> | null>;
    hdel(key: string, ...fields: string[]): Promise<void>;

    // List operations
    lpush<T>(key: string, ...values: T[]): Promise<number>;
    rpop<T>(key: string): Promise<T | null>;
    lrange<T>(key: string, start: number, stop: number): Promise<T[]>;

    // Set operations
    sadd(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    srem(key: string, ...members: string[]): Promise<void>;

    // Utility
    ping(): Promise<boolean>;
    flush(): Promise<void>;
}

// Create cache service
function createCacheService(): CacheService {
    let redis: RedisClient | null = null;

    const getClient = async (): Promise<RedisClient> => {
        if (!redis) {
            redis = await getRedis();
        }
        return redis;
    };

    return {
        // Basic operations
        async get<T>(key: string): Promise<T | null> {
            const client = await getClient();
            const value = await client.get(key);
            if (!value) return null;
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as unknown as T;
            }
        },

        async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
            const client = await getClient();
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            if (ttlSeconds) {
                await client.set(key, serialized, { ex: ttlSeconds });
            } else {
                await client.set(key, serialized);
            }
        },

        async del(key: string): Promise<void> {
            const client = await getClient();
            await client.del(key);
        },

        async exists(key: string): Promise<boolean> {
            const client = await getClient();
            const count = await client.exists(key);
            return count > 0;
        },

        // Pattern operations
        async delPattern(pattern: string): Promise<number> {
            const client = await getClient();
            const keys = await client.keys(pattern);
            if (keys.length === 0) return 0;
            return client.del(...keys);
        },

        // Atomic operations
        async incr(key: string, ttlSeconds?: number): Promise<number> {
            const client = await getClient();
            const value = await client.incr(key);
            if (ttlSeconds && value === 1) {
                await client.expire(key, ttlSeconds);
            }
            return value;
        },

        async decr(key: string): Promise<number> {
            const client = await getClient();
            return client.decr(key);
        },

        // Hash operations
        async hget<T>(key: string, field: string): Promise<T | null> {
            const client = await getClient();
            const value = await client.hget(key, field);
            if (!value) return null;
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as unknown as T;
            }
        },

        async hset<T>(key: string, field: string, value: T): Promise<void> {
            const client = await getClient();
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            await client.hset(key, field, serialized);
        },

        async hgetall<T>(key: string): Promise<Record<string, T> | null> {
            const client = await getClient();
            const data = await client.hgetall(key);
            if (!data || Object.keys(data).length === 0) return null;

            const result: Record<string, T> = {};
            for (const [k, v] of Object.entries(data)) {
                try {
                    result[k] = JSON.parse(v) as T;
                } catch {
                    result[k] = v as unknown as T;
                }
            }
            return result;
        },

        async hdel(key: string, ...fields: string[]): Promise<void> {
            const client = await getClient();
            await client.hdel(key, ...fields);
        },

        // List operations
        async lpush<T>(key: string, ...values: T[]): Promise<number> {
            const client = await getClient();
            const serialized = values.map((v) => (typeof v === 'string' ? v : JSON.stringify(v)));
            return client.lpush(key, ...serialized);
        },

        async rpop<T>(key: string): Promise<T | null> {
            const client = await getClient();
            const value = await client.rpop(key);
            if (!value) return null;
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as unknown as T;
            }
        },

        async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
            const client = await getClient();
            const values = await client.lrange(key, start, stop);
            return values.map((v) => {
                try {
                    return JSON.parse(v) as T;
                } catch {
                    return v as unknown as T;
                }
            });
        },

        // Set operations
        async sadd(key: string, ...members: string[]): Promise<number> {
            const client = await getClient();
            return client.sadd(key, ...members);
        },

        async smembers(key: string): Promise<string[]> {
            const client = await getClient();
            return client.smembers(key);
        },

        async srem(key: string, ...members: string[]): Promise<void> {
            const client = await getClient();
            await client.srem(key, ...members);
        },

        // Utility
        async ping(): Promise<boolean> {
            try {
                const client = await getClient();
                const result = await client.ping();
                return result === 'PONG';
            } catch {
                return false;
            }
        },

        async flush(): Promise<void> {
            // Intentionally limited - only clear app-specific keys
            const client = await getClient();
            for (const prefix of Object.values(CachePrefix)) {
                await this.delPattern(`${prefix}*`);
            }
        },
    };
}

// Singleton cache service
export const cache = createCacheService();

// Helper: Cache-aside pattern
export async function cacheAside<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds: number = CacheTTL.MEDIUM
): Promise<T> {
    const cached = await cache.get<T>(key);
    if (cached !== null) {
        return cached;
    }

    const data = await fetcher();
    await cache.set(key, data, ttlSeconds);
    return data;
}

// Helper: Invalidate cache on mutation
export async function invalidateCache(...keys: string[]): Promise<void> {
    for (const key of keys) {
        if (key.includes('*')) {
            await cache.delPattern(key);
        } else {
            await cache.del(key);
        }
    }
}
