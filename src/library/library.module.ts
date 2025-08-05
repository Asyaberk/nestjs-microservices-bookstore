import { Module } from '@nestjs/common';
import { LibraryService } from './services/library.service';
import { LibraryController } from './controllers/library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { LibraryRepository } from './repositories/library.repository';
import { Book } from '../books/entities/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Book])],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository]
})
export class LibraryModule {}
