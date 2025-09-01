import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { Injectable, Inject, BadGatewayException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class ApiGatewayAuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authProxyClient: ClientKafka,
        private readonly httpService: HttpService,
    ) { }
}