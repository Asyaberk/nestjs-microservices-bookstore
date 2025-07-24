import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../entities/books.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

@Controller('books')
export class BookController {
    constructor(private readonly booksService: BookService) { }

    //list all the books
    @Get()
    async getAllBooks(): Promise<Book[]> { 
        return this.booksService.findAll();
    }

    //admin functions(going to be updated!)
    @Post('/create')
    createBook(@Body() body: CreateBookDto) {
        return this.booksService.create(body);
    }

    @Put('/update/:id')
    updateBook(@Param('id') id: string, @Body() body: UpdateBookDto): Promise<Book> {
        return this.booksService.update(Number(id), body);
    }

    @Delete('/delete/:id')
    deleteBook(@Param('id') id: string): Promise<Book> {
        return this.booksService.remove(Number(id));
    }
}
