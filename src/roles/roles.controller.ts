import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    //list all the roles that entered by hand into the db
    @Get()
    async getAllRoles(): Promise<Role[]> {
        return this.rolesService.findAll();
    }
}
