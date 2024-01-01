import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigKey } from '../config.enum';

export const cacheConfig = registerAs(ConfigKey.CACHE, () => ({
  store: redisStore,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
  db: process.env.REDIS_DB || '0',
  ttl: Number(process.env.REDIS_TTL) || 1000,
}));
