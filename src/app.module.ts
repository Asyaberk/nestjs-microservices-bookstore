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
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config'; 
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController2 } from './app.controller2';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    //postgre connection
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      //i commented this docker db conneciton because 
      //i am using npm run start:dev 
      //just for now to compile faster and reduce storage(i do not have enough)
      //it needs its local db host name which is localhost
      //host: process.env.DB_HOST,
      host: 'localhost',
      synchronize: true, 
      database: process.env.DB_DATABASE,
      entities: [User, Role, Book, Rental],
    }),

    //WORKING WITH CACHE STORE(global caching)
    //global defauşt config
    CacheModule.register({
      //in seconds
      ttl: 10_000,
      isGlobal: true,
    }),

    AuthModule,
    UsersModule,
    RolesModule,
    BookModule,
    LibraryModule,
  ],
  controllers: [
    AppController,
    //for demo 
    AppController2
  ],
  providers: [
    AppService,
    //AUTO CACHING RESPONSE
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
