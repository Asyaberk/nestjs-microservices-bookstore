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

// default db options(from nestjs documentation)
const defaultOptions = {
  type: 'postgres' as const,
  port: 5432,
  username: 'asya',
  password: 'Asya1234',
  host: 'localhost',
  synchronize: true,
};

//PostgreSQL imports
@Module({
  imports: [
    //default database connection: nestjs-db
    TypeOrmModule.forRoot({
      ...defaultOptions,
      database: 'dbpostgre',
      entities: [User, Role, Book],
    }),

    //dont care this import
    //second database whit a name librarydb (i may use later, just added the connection)
    TypeOrmModule.forRoot({
      name: 'libraryConnection',
      ...defaultOptions,
      database: 'librarydb',
      entities: [],
    }),

    AuthModule,
    UsersModule,
    RolesModule,
    BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
