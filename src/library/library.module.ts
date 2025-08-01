import { Module } from '@nestjs/common';
import { LibraryService } from './services/library.service';
import { LibraryController } from './controllers/library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { LibraryRepository } from './repositories/library.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository]
})
export class LibraryModule {}
