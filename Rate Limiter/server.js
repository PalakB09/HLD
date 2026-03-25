require('dotenv').config();
const express = require('express');
const { connectRedis } = require('./src/config/redis');

// Middleware
const rateLimiter = require('./src/middleware/rateLimiter');

// Limiters
const FixedWindowCounter = require('./src/limiters/FixedWindowCounter');
const SlidingWindowLog = require('./src/limiters/SlidingWindowLog');
const SlidingWindowCounter = require('./src/limiters/SlidingWindowCounter');
const TokenBucket = require('./src/limiters/TokenBucket');
const LeakyBucket = require('./src/limiters/LeakyBucket');
const RedisFixedWindow = require('./src/limiters/RedisFixedWindow');

const app = express();
const PORT = process.env.PORT || 4000;

// Standard Limit: 5 requests per 10 seconds (10000 ms) for demonstration
// The limit is intentionally small so we can easily test 429 errors from the browser/curl
const LIMIT = 5;
const WINDOW_MS = 10000;

// Initialize Limiters
const limiters = {
  fixedWindow: new FixedWindowCounter(LIMIT, WINDOW_MS),
  slidingWindowLog: new SlidingWindowLog(LIMIT, WINDOW_MS),
  slidingWindowCounter: new SlidingWindowCounter(LIMIT, WINDOW_MS),
  tokenBucket: new TokenBucket(LIMIT, WINDOW_MS),
  leakyBucket: new LeakyBucket(LIMIT, WINDOW_MS),
  redisFixedWindow: new RedisFixedWindow(LIMIT, WINDOW_MS)
};

app.use(express.json());

// Set up discrete endpoints mapped to specific limiter strategies
Object.keys(limiters).forEach(key => {
  const endpoint = `/api/${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  
  app.get(endpoint, rateLimiter(limiters[key]), (req, res) => {
    res.json({
      success: true,
      message: `Success! Accessed ${key} endpoint with limit remaining.`,
      limiterUsed: key
    });
  });
});

// A fallback health endpoint
app.get('/', (req, res) => {
  res.send('Rate Limiter Demo. Add "/api/fixed-window" etc. to the URL to test.');
});

// Start the server
async function startServer() {
  try {
    await connectRedis();
    console.log('Connected to Redis successfully.');
  } catch (err) {
    console.error('Failed to connect to Redis. The redis-backed endpoint may fail. Start Redis locally or via Docker and set REDIS_URL mapping.');
  }

  app.listen(PORT, () => {
    console.log(`\nRate Limiting Server running on http://localhost:${PORT}`);
    console.log(`Global Strategy Configuration: Limit ${LIMIT} reqs / ${WINDOW_MS/1000}s`);
    console.log(`\nAvailable endpoints:`);
    Object.keys(limiters).forEach(key => {
        console.log(`- GET http://localhost:${PORT}/api/${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
    });
  });
}

startServer();
