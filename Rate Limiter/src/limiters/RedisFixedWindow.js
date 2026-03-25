const BaseLimiter = require('./BaseLimiter');
const { client } = require('../config/redis');

class RedisFixedWindow extends BaseLimiter {
  constructor(limit, windowMs) {
    super(limit, windowMs);
  }

  async isAllowed(key) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    const redisKey = `ratelimit:fixed:${key}:${windowStart}`;
    
    // We use a Redis transaction (MULTI) to safely increment and set expiration atomically.
    try {
      // INCR returns the value after incrementing sequentially avoiding race conditions.
      const [incrementResult] = await client
        .multi()
        .incr(redisKey)
        .pExpire(redisKey, this.windowMs) // Millisecond precision expiration
        .exec();

      const count = incrementResult;
      const resetTime = windowStart + this.windowMs;

      if (count <= this.limit) {
        return {
          allowed: true,
          remaining: this.limit - count,
          resetTime
        };
      }

      return {
        allowed: false,
        remaining: 0,
        resetTime
      };
    } catch (err) {
      console.error('RedisFixedWindow Error:', err);
      // Fail open to avoid blocking valid traffic if Redis crashes
      return { allowed: true, remaining: 1, resetTime: now + this.windowMs };
    }
  }
}

module.exports = RedisFixedWindow;
