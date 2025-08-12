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
import { ConfigModule } from '@nestjs/config'; 

/*
REDIS SETTING UP
docker run --name redis -p 6379:6379 -d redis 
docker exec -it redis redis-cli
ping pong ok
SET myKey "hello redis"
GET myKey
*/

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

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

    //WORKING WITH CACHE STORE
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
