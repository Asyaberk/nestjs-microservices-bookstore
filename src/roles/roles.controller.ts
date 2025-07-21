import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';
import { CreateRoleDto } from './dtos/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }
 
    //list all the roles
    @Get()
    async getAllRoles(): Promise<Role[]> { 
        return this.rolesService.findAll();
    }

    //create a new role
    @Post('/create')
    createRole(@Body() body: CreateRoleDto) {
        return this.rolesService.create(body.name);
    }

}
