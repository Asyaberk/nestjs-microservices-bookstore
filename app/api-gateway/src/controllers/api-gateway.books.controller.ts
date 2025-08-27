import { Controller } from "@nestjs/common";
import { ApiGatewayBooksService } from "../services/api-gateway.books.service";

@Controller('books')
export class ApiGatewayBooksController {
    constructor(private readonly apiGatewayService: ApiGatewayBooksService) { }
}