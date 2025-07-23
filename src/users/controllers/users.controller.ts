import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { };

    //list all the users
    @Get()
    async getAllRoles(): Promise<User[]> {
        return this.userService.findAll();
    }
    
}
