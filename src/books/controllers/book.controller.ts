import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../entities/books.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../roles/decorators/roles.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
export class BookController {
    constructor(private readonly booksService: BookService) { }

    /*
//I commented this block of code because i wrote a similar endpoint in library service class
    //all users functions
    //list all the books
    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all books' })
    @ApiOkResponse({
        description: 'Returns a list of all books.',
        schema: {
            type: 'array',
            items: {
                example: [
                    { id: 1, title: 'Atomic Habits', author: 'James Clear', publishedYear: 2018 },
                    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008 }
                ]
            }
        }
    })
    async getAllBooks(): Promise<Book[]> { 
        return this.booksService.findAll();
    } */

    //admin functions
    //we use guards (auth and roles) that we set earlier
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @Post('/create')
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new book (Admin only)' })
    @ApiOkResponse({
        description: 'Book created successfully.',
        schema: {
            example: { id: 3, title: 'Deep Work', author: 'Cal Newport', publishedYear: 2016 }
        }
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided.' })
    @ApiForbiddenResponse({ description: 'Access denied: Only admins can create books.' })
    createBook(@Body() body: CreateBookDto) {
        return this.booksService.create(body);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @Put('/update/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a book by ID (Admin only)' })
    @ApiOkResponse({
        description: 'Book updated successfully.',
        schema: {
            example: { id: 3, title: 'Deep Work (Updated Edition)', author: 'Cal Newport', publishedYear: 2025 }
        }
    })
    @ApiBadRequestResponse({ description: 'Invalid data or book not found.' })
    @ApiForbiddenResponse({ description: 'Access denied: Only admins can update books.' })
    updateBook(@Param('id') id: string, @Body() body: UpdateBookDto): Promise<Book> {
        return this.booksService.update(Number(id), body);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @Delete('/delete/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a book by ID (Admin only)' })
    @ApiOkResponse({
        description: 'Book deleted successfully.',
        schema: {
            example: { message: 'Book with ID 2 has been deleted.' }
        }
    })
    @ApiBadRequestResponse({ description: 'Book not found.' })
    @ApiForbiddenResponse({ description: 'Access denied: Only admins can delete books.' })
    deleteBook(@Param('id') id: string): Promise<Book> {
        return this.booksService.remove(Number(id));
    }
}
