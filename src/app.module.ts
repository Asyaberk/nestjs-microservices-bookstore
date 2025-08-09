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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

//PostgreSQL imports
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    //default database connection
    //i hid the sensitive data. they are in .env file
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

    AuthModule,
    UsersModule,
    RolesModule,
    BookModule,
    LibraryModule,

    //for now in-memory cache to practisch, before getting into redis
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
