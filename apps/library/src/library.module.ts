import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryService } from './services/library.service';
import { LibraryController } from './controllers/library.controller';
import { LibraryRepository } from './repositories/library.repository';
import { Rental } from '@app/entities/rental.entity';
import { Book } from '@app/entities/books.entity';
import { TestConsumer } from '@app/kafka/consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Book])],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository, TestConsumer],
})
export class LibraryModule {}
