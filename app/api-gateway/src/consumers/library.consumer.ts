import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LibraryService } from 'app/library/src/services/library.service';

@Controller()
export class LibraryConsumer {
  constructor(private readonly libraryService: LibraryService) {}

  @EventPattern('rental_created')
  async handleRentalCreated(@Payload() data: any) {
    console.log('rental_created event received:', data);
    await this.libraryService.rent(data.userId, { bookId: data.bookId });
  }

  @EventPattern('rental_returned')
  async handleRentalReturned(@Payload() data: any) {
    console.log('rental_returned event received:', data);
    await this.libraryService.returnBook(data.userId, data.bookId);
  }
}