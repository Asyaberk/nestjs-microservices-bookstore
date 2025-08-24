import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryService } from './services/library.service';
import { LibraryController } from './controllers/library.controller';
import { LibraryRepository } from './repositories/library.repository';
import { Rental } from '@app/entities/rental.entity';
import { Book } from '@app/entities/books.entity';
import { KafkaModule } from '@app/kafka';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/strategy';
import { User } from '@app/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, Book, User]),
    KafkaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'cat',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository, JwtStrategy],
})
export class LibraryModule {}
