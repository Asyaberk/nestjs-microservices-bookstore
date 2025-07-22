import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
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

    //Auth Modülünün içinde yapacağım JWT öğreniyorum
    /*
    //register function to create a new user
    @Post('/register')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password, body.roleId);
    }

    //login function

    //logout function  
    */
    
    //update function
}
