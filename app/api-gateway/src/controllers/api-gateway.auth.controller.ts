import { Body, Controller, Delete, HttpCode, Param, Post, Put, Req } from "@nestjs/common";
import { ApiGatewayBooksService } from "../services/api-gateway.books.service";
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiForbiddenResponse } from "@nestjs/swagger";

import { ApiGatewayAuthService } from "../services/api-gateway.auth.service";

@Controller('auth')
export class ApiGatewayAuthController {
    constructor(private readonly apiGatewayService: ApiGatewayAuthService) { }
}