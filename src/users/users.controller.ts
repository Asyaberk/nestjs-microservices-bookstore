import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        //test validation
        console.log(body);
    }
}
