import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number.parseInt(process.env.REDIS_PORT) || 8379,
    });
  }

  async getValue(key: string): Promise<any | null> {
    return await this.redisClient.get(key);
  }

  async setValue(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, value);
  }
}
