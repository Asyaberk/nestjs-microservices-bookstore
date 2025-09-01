import { CreateUserDto, LoginUserDto } from '@app/dtos';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from 'app/auth/src/services/auth.service';

@Controller()
export class AuthConsumer {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('user_registered')
  async handleUserRegistered(@Payload() data: CreateUserDto) {
    console.log('user_registered event received:', data);
    await this.authService.register(data);
  }

  @EventPattern('user_logged_in')
  async handleUserLoggedIn(@Payload() data: LoginUserDto) {
    console.log('user_logged_in event received:', data);
    await this.authService.login(data);
  }

  @EventPattern('user_logged_out')
  async handleUserLoggedOut(@Payload() data: { userId: number }) {
    console.log('user_logged_out event received:', data);
    this.authService.logout(data.userId);
  }
}