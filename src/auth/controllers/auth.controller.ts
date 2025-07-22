import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

//We add these because the password field is automatically removed from the response.
@UseInterceptors(ClassSerializerInterceptor) 
//user auth
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //register function
    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    //login function
    @Post('/login')
    async login(@Body() body: LoginUserDto, @Res({passthrough: true}) response : Response) {   
        return this.authService.login(body, response);
    }

    //logout function
    @Post('/logout')
    logout(@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response);
    }

    //check current user to test login logout function
    @Get('/whoami')
    @UseGuards(JwtAuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }
}

