const BaseLimiter = require('./BaseLimiter');

class FixedWindowCounter extends BaseLimiter {
  constructor(limit, windowMs) {
    super(limit, windowMs);
    // Map to store requests: key -> { count: number, windowStart: number }
    this.store = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    
    // Calculate the start time of the current fixed window
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    const resetTime = windowStart + this.windowMs;

    let record = this.store.get(key);

    if (!record || record.windowStart !== windowStart) {
      // If no record exists or the old window has elapsed, reset counter
      record = { count: 1, windowStart };
      this.store.set(key, record);
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime
      };
    }

    if (record.count < this.limit) {
      record.count++;
      return {
        allowed: true,
        remaining: this.limit - record.count,
        resetTime
      };
    }

    // Limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime
    };
  }
}

module.exports = FixedWindowCounter;
