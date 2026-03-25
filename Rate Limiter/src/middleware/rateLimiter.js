/**
 * Express Middleware factory for rate limiting.
 * @param {import('../limiters/BaseLimiter')} limiterInstance 
 */
function rateLimiter(limiterInstance) {
  return async (req, res, next) => {
    try {
      // Use standard IPs or forwarded for proxies
      const key = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
      
      const { allowed, remaining, resetTime } = await limiterInstance.isAllowed(key);

      // Set standard tracking headers
      res.setHeader('X-RateLimit-Limit', limiterInstance.limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));

      if (!allowed) {
        res.setHeader('Retry-After', Math.ceil((resetTime - Date.now()) / 1000));
        return res.status(429).json({
          error: 'Too Many Requests',
          message: 'Rate limit strictly exceeded. Please try again later.',
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
        });
      }

      next();
    } catch (err) {
      console.error('Rate Limiter Middleware Exception:', err);
      // Best practice: Fail-open rather than hard crashing valid traffic
      next();
    }
  };
}

module.exports = rateLimiter;
