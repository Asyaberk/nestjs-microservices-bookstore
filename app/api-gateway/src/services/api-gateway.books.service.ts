import { HttpService } from "@nestjs/axios";
import { Injectable, Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class ApiGatewayBooksService {
    constructor(
        @Inject('BOOKS_SERVICE') private readonly booksProxyClient: ClientKafka,
        private readonly httpService: HttpService
    ) { }
}