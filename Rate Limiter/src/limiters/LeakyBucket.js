const BaseLimiter = require('./BaseLimiter');

class LeakyBucket extends BaseLimiter {
  constructor(limit, windowMs) {
    super(limit, windowMs);
    // Limit is effectively bucket capacity queue length
    // Drip processing rate = limit / windowMs (requests processed per millisecond)
    // We simulate the queue mathematically by tracking the `nextAllowedTime` for the user.
    this.store = new Map(); // key -> { nextAllowedTime }
  }

  async isAllowed(key) {
    const now = Date.now();
    const timePerRequest = this.windowMs / this.limit;

    let record = this.store.get(key);

    if (!record) {
      // Queue is empty, process immediately and push next allowed time
      record = { nextAllowedTime: now + timePerRequest };
      this.store.set(key, record);
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: record.nextAllowedTime
      };
    }

    // If queue has inherently drained beyond 'now' due to inactivity, reset it strictly to 'now'
    let nextAllowedTime = Math.max(now, record.nextAllowedTime);

    // If the logical end of the queue exceeds the total window duration we allow, the bucket overflows.
    if ((nextAllowedTime - now) > this.windowMs) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: nextAllowedTime - this.windowMs // When there will be space in the bucket
      };
    }

    // Enqueue request: push the nextAllowedTime back by one unit
    record.nextAllowedTime = nextAllowedTime + timePerRequest;
    this.store.set(key, record);

    const remainingCapacity = this.limit - Math.ceil((record.nextAllowedTime - now) / timePerRequest);

    return {
      allowed: true,
      remaining: Math.max(0, remainingCapacity),
      resetTime: record.nextAllowedTime
    };
  }
}

module.exports = LeakyBucket;
