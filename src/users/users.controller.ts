import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { };

    //list all the users
    @Get()
    async getAllRoles(): Promise<User[]> {
        return this.userService.findAll();
    }
    
}
