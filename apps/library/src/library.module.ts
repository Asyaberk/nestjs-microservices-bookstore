import { Module } from '@nestjs/common';
import { LibraryService } from './services/library.service';
import { LibraryController } from './controllers/library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from '@app/entities/rental.entity';
import { LibraryRepository } from './repositories/library.repository';
import { Book } from '@app/entities/books.entity';
import { KafkaModule } from '@app/kafka';
import { AppConfigModule } from '@app/config';
import { TestConsumer } from '@app/kafka/consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, Book]),
    KafkaModule,
    AppConfigModule,
  ],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository, TestConsumer],
})
export class LibraryModule {}
