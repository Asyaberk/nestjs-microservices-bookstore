import { Body, Controller, Delete, HttpCode, Param, Post, Put, Req } from "@nestjs/common";
import { ApiGatewayBooksService } from "../services/api-gateway.books.service";
import { CreateBookDto, UpdateBookDto } from "@app/dtos";
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiForbiddenResponse } from "@nestjs/swagger";

@Controller('books')
export class ApiGatewayBooksController {
    constructor(private readonly apiGatewayService: ApiGatewayBooksService) { }

    @Post('/create')
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new book (Admin only)' })
    @ApiOkResponse({
        description: 'Book created successfully.',
        schema: {
            example: {
                id: 3,
                title: 'Deep Work',
                author: 'Cal Newport',
                publishedYear: 2016,
            },
        },
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided.' })
    @ApiForbiddenResponse({
        description: 'Access denied: Only admins can create books.',
    })
    createBook(@Req() req, @Body() body: CreateBookDto) {
        return this.apiGatewayService.proxyPost('/books/create', body, req);
    }

    @Put('/update/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a book by ID (Admin only)' })
    @ApiOkResponse({
        description: 'Book updated successfully.',
        schema: {
            example: {
                id: 3,
                title: 'Deep Work (Updated Edition)',
                author: 'Cal Newport',
                publishedYear: 2025,
            },
        },
    })
    @ApiBadRequestResponse({ description: 'Invalid data or book not found.' })
    @ApiForbiddenResponse({
        description: 'Access denied: Only admins can update books.',
    })
    updateBook(@Req() req, @Param('id') id: string, @Body() body: UpdateBookDto) {
        return this.apiGatewayService.proxyPut(`/books/update/${id}`, body, req);
    }

    @Delete('/delete/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a book by ID (Admin only)' })
    @ApiOkResponse({
        description: 'Book deleted successfully.',
        schema: {
            example: { message: 'Book with ID 2 has been deleted.' },
        },
    })
    @ApiBadRequestResponse({ description: 'Book not found.' })
    @ApiForbiddenResponse({
        description: 'Access denied: Only admins can delete books.',
    })
    deleteBook(@Req() req, @Param('id') id: string) {
        return this.apiGatewayService.proxyDelete(`/books/delete/${id}`, req);
    }
}