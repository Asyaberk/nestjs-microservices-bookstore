import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../entities/books.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';

@Controller('books')
export class BookController {
    constructor(private readonly booksService: BookService) { }

    //all users functions
    //list all the books
    @Get()
    async getAllBooks(): Promise<Book[]> { 
        return this.booksService.findAll();
    }

    //admin functions
    //we use guards (auth and roles) that we set earlier
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Post('/create')
    createBook(@Body() body: CreateBookDto) {
        return this.booksService.create(body);
    }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin') 
    @Put('/update/:id')
    updateBook(@Param('id') id: string, @Body() body: UpdateBookDto): Promise<Book> {
        return this.booksService.update(Number(id), body);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Delete('/delete/:id')
    deleteBook(@Param('id') id: string): Promise<Book> {
        return this.booksService.remove(Number(id));
    }
}
