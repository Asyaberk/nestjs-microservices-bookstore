import { Controller } from "@nestjs/common";
import { ApiGatewayUsersService } from "../services/api-gateway.users.service";

@Controller('library')
export class ApiGatewayUsersController {
    constructor(private readonly apiGatewayService: ApiGatewayUsersService) { }
}
