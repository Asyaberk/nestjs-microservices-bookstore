import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

//user auth
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //register function
    @Post('/register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    //login function
    @Post('/login')
    login() {
        
    }

    //logout function
    @Post('/logout')
    logout() {
        
    }
}
