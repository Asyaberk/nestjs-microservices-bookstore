import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Role } from './roles.entity';
import { Book } from './books.entity';
import { Rental } from './rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Book, Rental])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
