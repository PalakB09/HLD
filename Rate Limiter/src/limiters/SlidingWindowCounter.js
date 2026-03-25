const BaseLimiter = require('./BaseLimiter');

class SlidingWindowCounter extends BaseLimiter {
  constructor(limit, windowMs) {
    super(limit, windowMs);
    // key -> { prevCount, currCount, currWindowStart }
    this.store = new Map();
  }

  async isAllowed(key) {
    const now = Date.now();
    const currentWindowStart = Math.floor(now / this.windowMs) * this.windowMs;
    
    let record = this.store.get(key);

    if (!record || record.currWindowStart !== currentWindowStart) {
      if (record && currentWindowStart - record.currWindowStart === this.windowMs) {
        // Shift current window to previous window because exactly one window elapsed
        record = {
          prevCount: record.currCount,
          currCount: 0,
          currWindowStart: currentWindowStart
        };
      } else {
        // More than one window has passed, or it's a completely new record
        record = { prevCount: 0, currCount: 0, currWindowStart: currentWindowStart };
      }
    }

    // Interpolate the weighted previous window (1 - (time into current window / window size))
    const timeIntoCurrentWindow = now - currentWindowStart;
    const overlapPercentage = (this.windowMs - timeIntoCurrentWindow) / this.windowMs;

    // Approximate count based on probability / intersection
    const estimatedCount = (record.prevCount * overlapPercentage) + record.currCount;

    if (estimatedCount < this.limit) {
      record.currCount++;
      this.store.set(key, record);
      return {
        allowed: true,
        remaining: Math.max(0, Math.floor(this.limit - estimatedCount - 1)),
        resetTime: currentWindowStart + this.windowMs 
      };
    }

    this.store.set(key, record);
    return {
      allowed: false,
      remaining: 0,
      resetTime: currentWindowStart + this.windowMs
    };
  }
}

module.exports = SlidingWindowCounter;
