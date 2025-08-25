import { Controller, Get, HttpCode, Req } from "@nestjs/common";
import { ApiGatewayUsersService } from "../services/api-gateway.users.service";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";

@Controller('users')
export class ApiGatewayUsersController {
  constructor(private readonly apiGatewayService: ApiGatewayUsersService) {}

  //GET proxy calls
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns a list of all users.',
    schema: {
      type: 'object',
      properties: {
        source: { type: 'string', example: 'gateway' },
        data: {
          type: 'array',
          items: { type: 'object' },
          example: [
            { id: 1, email: 'admin@mail.com', role: { id: 1, name: 'admin' } },
            { id: 2, email: 'user@mail.com', role: { id: 2, name: 'user' } },
          ],
        },
      },
    },
  })
  getAllUsers(@Req() req) {
    return this.apiGatewayService.proxyGet('/users', req);
  }
}

