const BaseLimiter = require('./BaseLimiter');

class TokenBucket extends BaseLimiter {
  constructor(limit, windowMs) {
    super(limit, windowMs);
    // We treat limit as the max tokens (bucket capacity)
    // Refill rate = limit / windowMs (tokens per millisecond)
    this.store = new Map(); // key -> { tokens, lastRefill }
  }

  async isAllowed(key) {
    const now = Date.now();
    let record = this.store.get(key);
    const tokensPerMs = this.limit / this.windowMs;

    if (!record) {
      // First time, start with full capacity and consume 1 immediately
      record = { tokens: this.limit - 1, lastRefill: now };
      this.store.set(key, record);
      return {
        allowed: true,
        remaining: record.tokens,
        resetTime: now + (1 / tokensPerMs) // Time for next token to be generated
      };
    }

    // Calculate how many tokens should have been refilled
    const timePassed = now - record.lastRefill;
    const tokensToAdd = Math.floor(timePassed * tokensPerMs);

    if (tokensToAdd > 0) {
      // Add tokens, cap at limit
      record.tokens = Math.min(this.limit, record.tokens + tokensToAdd);
      // Advance lastRefill by exactly the fractional time representing the integer tokens added
      // to avoid losing decimal remainders over time.
      record.lastRefill += tokensToAdd * (1 / tokensPerMs);
    }

    if (record.tokens >= 1) {
      record.tokens -= 1;
      this.store.set(key, record);
      return {
        allowed: true,
        remaining: record.tokens,
        resetTime: now + (1 / tokensPerMs)
      };
    }

    return {
      allowed: false,
      remaining: 0,
      resetTime: Math.ceil(record.lastRefill + (1 / tokensPerMs))
    };
  }
}

module.exports = TokenBucket;
