import Redis from 'async-redis';

export const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
});

redis.on('ready', () => console.log('Redis client is ready'));
redis.on('error', err => console.error('Redis error:', err));
