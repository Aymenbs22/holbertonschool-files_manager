const { promisify } = require('util');
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  isAlive() {
    this.client.isAlive = true;
    const alive = this.client.isAlive;
    return alive;
  }

  async get(key) {
    const getv = promisify(this.client.get).bind(this.client)(key);
    return getv;
  }

  async set(key, value, duration) {
    return this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    return this.client.del(key);
  }
}
module.exports = new RedisClient();
