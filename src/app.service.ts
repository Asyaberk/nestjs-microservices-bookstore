import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached-item', { key: 32 }, 60);

    const cachedItem = await this.cacheManager.get('cached-item');
    console.log(cachedItem);

    return 'Hello World!';
  }
}
