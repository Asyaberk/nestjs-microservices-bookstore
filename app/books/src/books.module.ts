import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { BookRepository } from './repositories/books.repository';
import { Book } from '@app/entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '@app/entities';
import { JwtStrategy } from '@app/strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository, JwtStrategy],
  exports: [BookRepository],
})
export class BookModule {}
