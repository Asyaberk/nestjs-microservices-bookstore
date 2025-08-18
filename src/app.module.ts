import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/users.entity';
import { Role } from './roles/entities/roles.entity';
import { BookModule } from './books/book.module';
import { Book } from './books/entities/books.entity';
import { LibraryModule } from './library/library.module';
import { Rental } from './library/entities/rental.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { AppConfigModule } from '@app/config';
import { HealthController } from './health.controller';
import { KafkaModule } from '@app/kafka';

@Module({
  imports: [
    //add kafka
    KafkaModule,
    
    //ConfigModule.forRoot({ isGlobal: true }),
    //i made my own config lib
    AppConfigModule,

    //postgre connection
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      synchronize: true,
      database: process.env.DB_DATABASE,
      entities: [User, Role, Book, Rental],
    }),
    //docker compose up -d --build
    //docker ps
    //docker compose down

    //Redis caching
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 10_000, lruSize: 5000 }),
            }),
            createKeyv(process.env.REDIS_URL || 'redis://localhost:6379'),
          ],
        };
      },
    }),

    AuthModule,
    UsersModule,
    RolesModule,
    BookModule,
    LibraryModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
