// Cache module exports
export { getRedis, disconnectRedis, isRedisConnected } from './redis.client';
export type { RedisClient, SetOptions } from './redis.client';

export {
    cache,
    cacheAside,
    invalidateCache,
    CachePrefix,
    CacheTTL,
} from './cache.service';
export type { CacheService } from './cache.service';
