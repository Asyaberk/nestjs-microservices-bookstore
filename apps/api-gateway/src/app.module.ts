import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';

import { AppConfigModule } from '@app/config';
import { KafkaModule } from '@app/kafka';

import { ApiGatewayModule } from './api-gateway.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    AppConfigModule,
    KafkaModule,

    // Redis cache
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        stores: [
          new Keyv({
            store: new CacheableMemory({ ttl: 10_000, lruSize: 5000 }),
          }),
          createKeyv(process.env.REDIS_URL || 'redis://localhost:6379'),
        ],
      }),
    }),

    ApiGatewayModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
