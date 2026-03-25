const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: false // Disable infinite reconnection attempts if Redis is offline
  }
});

client.on('error', () => {
  // Suppress verbose reconnect errors from spamming the console
});

async function connectRedis() {
  if (!client.isOpen) {
    try {
      await client.connect();
    } catch (e) {
      // Catch initial connection error gracefully
    }
  }
}

module.exports = {
  client,
  connectRedis
};
