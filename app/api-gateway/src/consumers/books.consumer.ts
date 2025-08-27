import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BookService } from 'app/books/src/services/book.service';
import { CreateBookDto } from '@app/dtos/create-book.dto';
import { UpdateBookDto } from '@app/dtos/update-book.dto';

@Controller()
export class BooksConsumer {
  constructor(private readonly booksService: BookService) {}

  @EventPattern('book_created')
  async handleBookCreated(@Payload() data: CreateBookDto) {
    console.log('book_created event received:', data);
    if (data?.title) {
      await this.booksService.create(data);
    }
  }

  @EventPattern('book_updated')
  async handleBookUpdated(@Payload() data: { id: number } & UpdateBookDto) {
    console.log('book_updated event received:', data);
    if (data?.id) {
      await this.booksService.update(data.id, data);
    }
  }

  @EventPattern('book_deleted')
  async handleBookDeleted(@Payload() data: { id: number }) {
    console.log('book_deleted event received:', data);
    if (data?.id) {
      await this.booksService.remove(data.id);
    }
  }
}
