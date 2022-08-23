/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const redis = require('redis');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    this._client.on('error', (error) => {
      console.error(error);
    });

    this._client.connect();
  }

  // Penyimpanan nilai pada cache redis
  // Command pada redis --> SET key value EX expirationInSecond
  async set(key, value, expirationInSecond = 1800) {
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  // Fungsi untuk mendapatkan data dari cache redis
  // Command pada redis --> GET key
  async get(key) {
    const result = await this._client.get(key);

    if (result == null) throw new Error('Cache tidak ditemukan');

    return result;
  }

  // Fungsi untuk menghapus data pada cache
  // Command pada redis --> DEL key
  delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
