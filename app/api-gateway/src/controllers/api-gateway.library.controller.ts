import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiGatewayLibraryService } from '../services/api-gateway.library.service';
import { CreateRentalDto } from '@app/dtos';

@Controller('library')
export class ApiGatewayLibraryController {
  constructor(private readonly apiGatewayService: ApiGatewayLibraryService) {}

  //we are writing all endpoints to reach from the same base gateway url
  //BUT WE DONT ACTURALLY NEED TO USE THE SAME URL :)!
  //TRY ON POSTMAN!

  //GET proxy calls
  @Get('books')
  getAvailableBooks(@Req() req) {
    return this.apiGatewayService.proxyGet('/library/books', req);
  }

  @Get('myBooks')
  getMyBooks(@Req() req) {
    return this.apiGatewayService.proxyGet('/library/myBooks', req);
  }

  @Get('repository')
  getRepository(@Req() req) {
    return this.apiGatewayService.proxyGet('/library/repository', req);
  }

  //POST Kafka event
  @Post('rent')
  rent(@Req() req, @Body() dto: CreateRentalDto) {
    return this.apiGatewayService.proxyPost('/library/rent', dto, req);
  }

  @Post('return/:bookId')
  returnRental(@Req() req, @Param('bookId') bookId: string) {
    return this.apiGatewayService.proxyPost(`/library/return/${bookId}`, {}, req);
  }
}