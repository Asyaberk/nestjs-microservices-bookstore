import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';


@Injectable()
export class ApiGatewayUsersService {
    constructor(
        private readonly httpService: HttpService,
    ) { }
}