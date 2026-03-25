class BaseLimiter {
  /**
   * @param {number} limit - Maximum allowed requests
   * @param {number} windowMs - Time window in milliseconds
   */
  constructor(limit, windowMs) {
    if (new.target === BaseLimiter) {
      throw new TypeError("Cannot construct BaseLimiter instances directly");
    }
    this.limit = limit;
    this.windowMs = windowMs;
  }

  /**
   * Determine if the request is allowed.
   * @param {string} key - The unique identifier for the requester (e.g., IP address).
   * @returns {Promise<{allowed: boolean, remaining: number, resetTime: number}>}
   */
  async isAllowed(key) {
    throw new Error("Method 'isAllowed(key)' must be implemented.");
  }
}

module.exports = BaseLimiter;
