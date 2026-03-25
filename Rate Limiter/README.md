## Algorithms Implemented

This project includes fully functional, mathematically accurate implementations of:

1.  **Fixed Window Counter** (`FixedWindowCounter.js`): Simple interval resets for basic quotas.
2.  **Sliding Window Log** (`SlidingWindowLog.js`): Perfect precision timeline logging for sensitive endpoints.
3.  **Sliding Window Counter** (`SlidingWindowCounter.js`): Hybrid, memory-efficient probabilistic smoothing (Industry Standard).
4.  **Token Bucket** (`TokenBucket.js`): Lazy-evaluated refill mechanics for handling bursts gracefully.
5.  **Leaky Bucket** (`LeakyBucket.js`): Strict chronological pouring for consistent downstream processing rates.
6.  **Redis Fixed Window** (`RedisFixedWindow.js`): A purely distributed approach utilizing atomic Redis `MULTI/EXEC` pipelines to resolve cross-server concurrency and race conditions.

## Project Structure

```text
rate-limiter/
├── src/
│   ├── config/
│   │   └── redis.js                # Singleton Redis connection instance safely degrading on failure
│   ├── limiters/
│   │   ├── BaseLimiter.js          # Shared Abstract API Contract `isAllowed(key)`
│   │   ├── FixedWindowCounter.js
│   │   ├── LeakyBucket.js
│   │   ├── RedisFixedWindow.js
│   │   ├── SlidingWindowCounter.js
│   │   ├── SlidingWindowLog.js
│   │   └── TokenBucket.js
│   └── middleware/
│       └── rateLimiter.js          # Pluggable Express Middleware yielding HTTP 429
├── server.js                       # Active Express HTTP app mapping strategies to API endpoints
└── simulator.js                    # Standalone logical traffic pattern tester
```

##  Getting Started

### Installation

```bash
npm install
```

### Running the Algorithmic Simulator

To witness how the algorithms react differently to exact burst and steady chronological traffic patterns (without network overhead), run the simulator:

```bash
node simulator.js
```

### Running the Live Integration Server

To spin up the Express server encapsulating these limiters conceptually:

```bash
node server.js
```

The server binds to `http://localhost:4000`. By default, it restricts access to 5 requests per 10 seconds.
You can ping specific endpoints physically to see standard API Headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`):

```bash
# Valid Request
curl -i http://localhost:4000/api/sliding-window-counter

# Overload Request (Receives HTTP 429 Too Many Requests)
curl -i http://localhost:4000/api/sliding-window-counter
```

## Middleware

```javascript
const TokenBucket = require('./src/limiters/TokenBucket');
const rateLimiter = require('./src/middleware/rateLimiter');

// Allow 100 requests every 60000 ms (1 minute)
const loginLimiter = new TokenBucket(100, 60000);

app.post('/login', rateLimiter(loginLimiter), (req, res) => {
    res.json({ success: true });
});
```
