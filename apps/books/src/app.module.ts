import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@app/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { EntitiesModule } from '@app/entities';
import { BookModule } from './books.module';

@Module({
  imports: [
    AppConfigModule,

    // DB connection
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, 
      synchronize: true,
    }),

    EntitiesModule, //All entities

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

    BookModule,
  ],
})
export class AppModule {}
