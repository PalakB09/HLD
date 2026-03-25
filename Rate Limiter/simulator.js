const FixedWindowCounter = require('./src/limiters/FixedWindowCounter');
const SlidingWindowLog = require('./src/limiters/SlidingWindowLog');
const SlidingWindowCounter = require('./src/limiters/SlidingWindowCounter');
const TokenBucket = require('./src/limiters/TokenBucket');
const LeakyBucket = require('./src/limiters/LeakyBucket');

// Exclude Redis from offline simulation to test logic without IO overhead
const limitersToTest = [
  { name: 'Fixed Window', limiter: new FixedWindowCounter(3, 1000) },
  { name: 'Sliding Log', limiter: new SlidingWindowLog(3, 1000) },
  { name: 'Sliding Counter', limiter: new SlidingWindowCounter(3, 1000) },
  { name: 'Token Bucket', limiter: new TokenBucket(3, 1000) },
  { name: 'Leaky Bucket', limiter: new LeakyBucket(3, 1000) }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runSimulation() {
  console.log('--- RATE LIMITER BEHAVIOR SIMULATION ---');
  console.log('Configuration: Limiting to 3 requests per 1000ms window.');

  for (const testCase of limitersToTest) {
    console.log(`\nTesting Algorithm: [${testCase.name}]`);
    const key = `user_${testCase.name.replace(/\s+/g, '_')}`;
    let allowedCount = 0;
    let blockedCount = 0;

    // Burst Simulation: 5 fast requests (first 3 should pass, next 2 blocked)
    console.log('\n[Phase 1] Burst Test: Rapidly pulsing 5 requests...');
    for (let i = 1; i <= 5; i++) {
      const res = await testCase.limiter.isAllowed(key);
      console.log(` Req ${i}: Allowed=${res.allowed.toString().padEnd(5)} | Remaining=${res.remaining} | ResetTime delta=+${res.resetTime - Date.now()}ms`);
      res.allowed ? allowedCount++ : blockedCount++;
      // slight delay simply to mimic nominal network jitter
      await sleep(10);
    }
    console.log(` Burst Result -> Allowed: ${allowedCount}, Blocked: ${blockedCount}`);

    // Wait for approx half the window
    console.log('\n[Phase 2] Waiting 500ms... (Checking behavior on partial window refresh)');
    await sleep(500);

    const midRes = await testCase.limiter.isAllowed(key);
    console.log(` Req 6 (mid-window): Allowed=${midRes.allowed.toString().padEnd(5)} | Remaining=${midRes.remaining}`);

    // Wait for the window to reset fully globally (600ms more ensures > 1000ms total since burst)
    console.log('\n[Phase 3] Waiting 600ms... (Ensuring full limit boundary expires)');
    await sleep(600);

    console.log(' Sending 3 rapid requests... (Checking clean state behavior)');
    for (let i = 7; i <= 9; i++) {
      const resetRes = await testCase.limiter.isAllowed(key);
      console.log(` Req ${i}: Allowed=${resetRes.allowed.toString().padEnd(5)} | Remaining=${resetRes.remaining}`);
    }
  }

  console.log('\n--- SIMULATION COMPLETE ---');
}

runSimulation();
