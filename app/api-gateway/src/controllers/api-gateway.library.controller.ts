import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ApiGatewayLibraryService } from '../services/api-gateway.library.service';
import { CreateRentalDto } from '@app/dtos';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiForbiddenResponse, ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';

@Controller('library')
export class ApiGatewayLibraryController {
  constructor(private readonly apiGatewayService: ApiGatewayLibraryService) { }

  //we are writing all endpoints to reach from the same base gateway url
  //BUT WE DONT ACTURALLY NEED TO USE THE SAME URL :)!
  //TRY ON POSTMAN!

  //GET proxy calls
  @Get('/books')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all available books' })
  @ApiOkResponse({
    description: 'Returns an array of available books',
    schema: {
      example: [
        {
          id: 1,
          title: 'Atomic Habits',
          author: 'James Clear',
          publishedYear: 2018,
          available: true,
        },
        {
          id: 2,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          publishedYear: 2008,
          available: true,
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  getAvailableBooks(@Req() req) {
    return this.apiGatewayService.proxyGet('/library/books', req);
  }

  @Get('/myBooks')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all books rented by the current user' })
  @ApiOkResponse({
    description: 'Returns an array of rentals belonging to the current user',
    schema: {
      example: [
        {
          rentalId: 10,
          book: { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
          rentDate: '2025-08-05T12:00:00.000Z',
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  getMyBooks(@Req() req) {
    return this.apiGatewayService.proxyGet('/library/myBooks', req);
  }

  @Get('/repository')
  @HttpCode(200)
  @ApiOperation({ summary: 'List all rentals and their status (Admin Only)' })
  @ApiOkResponse({
    description: 'Returns a list of all rentals with user and book details',
    schema: {
      example: [
        {
          rentalId: 10,
          user: { id: 1, email: 'user@mail.com' },
          book: { id: 2, title: 'Clean Code' },
          rentDate: '2025-08-05T12:00:00.000Z',
        },
        {
          rentalId: 11,
          user: { id: 2, email: 'another@mail.com' },
          book: { id: 3, title: 'Atomic Habits' },
          rentDate: '2025-08-06T12:00:00.000Z',
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiForbiddenResponse({
    description: 'Access denied: Only admins can create books.',
  })
  getRepository(@Req() req) {
    return this.apiGatewayService.proxyGet('/library/repository', req);
  }

  //POST Kafka event
  @Post('/rent')
  @HttpCode(201)
  @ApiOperation({ summary: 'Rent a book by sending bookId' })
  @ApiBody({ type: CreateRentalDto })
  @ApiCreatedResponse({
    description: 'Successfully rented the book',
    schema: {
      example: {
        rentalId: 15,
        user: { id: 1, email: 'user@mail.com' },
        book: { id: 2, title: 'Clean Code' },
        rentDate: '2025-08-05T12:00:00.000Z',
      },
    },
  })
  rent(@Req() req, @Body() dto: CreateRentalDto) {
    return this.apiGatewayService.proxyPost('/library/rent', dto, req);
  }

  @Post('/return/:bookId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Return a rented book by its bookId' })
  @ApiParam({
    name: 'bookId',
    example: 2,
    description: 'ID of the book to return',
  })
  @ApiOkResponse({
    description: 'Book returned successfully',
    schema: {
      example: {
        message: 'Book with ID 2 has been returned and is now available.',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid book ID or rental not found.',
  })
  returnRental(@Req() req, @Param('bookId') bookId: string) {
    return this.apiGatewayService.proxyPost(
      `/library/return/${bookId}`,
      {},
      req,
    );
  }
}