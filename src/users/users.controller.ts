import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) { };

    //register function to create a new user
    @Post('/register')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password, body.roleId);
    }
}
