const BaseLimiter = require('./BaseLimiter');

class SlidingWindowLog extends BaseLimiter {
  constructor(limit, windowMs) {
    super(limit, windowMs);
    // Map to store requests: key -> [timestamp1, timestamp2, ...]
    this.store = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let log = this.store.get(key) || [];

    // Remove timestamps older than the windowStart
    // Processing this synchronously in a pure array works well for standard limits.
    log = log.filter(timestamp => timestamp > windowStart);

    if (log.length < this.limit) {
      log.push(now);
      this.store.set(key, log);
      return {
        allowed: true,
        remaining: this.limit - log.length,
        resetTime: log[0] + this.windowMs // When the oldest request will expire
      };
    }

    this.store.set(key, log); // Always update to trim memory
    return {
      allowed: false,
      remaining: 0,
      resetTime: log[0] + this.windowMs // Wait for the oldest request to expire
    };
  }
}

module.exports = SlidingWindowLog;
