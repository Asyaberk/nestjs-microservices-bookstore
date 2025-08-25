import { Body, Controller, Get, HttpCode, Post, Req } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { ApiGatewayRolesService } from "../services/api-gateway.roles.service";
import { CreateRoleDto } from "@app/dtos";

@Controller('roles')
export class ApiGatewayRolesController {
  constructor(private readonly apiGatewayService: ApiGatewayRolesService) {}

  //GET proxy calls
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Fetch all roles' })
  @ApiOkResponse({
    description: 'Returns a list of all roles.',
    schema: {
      type: 'array',
      example: [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user' },
      ],
    },
  })
  getAllRoles(@Req() req) {
    return this.apiGatewayService.proxyGet('/roles', req);
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiCreatedResponse({
    description: 'Role created successfully.',
    schema: {
      example: { id: 3, name: 'manager' },
    },
  })
  @ApiBadRequestResponse({
    description: 'Creation failed: Invalid data or role already exists.',
  })
  createRole( @Req() req, @Body() body: CreateRoleDto) {
    return this.apiGatewayService.proxyPost('/roles/create', body, req);
  }
}