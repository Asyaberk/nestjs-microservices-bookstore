import { Controller } from '@nestjs/common';
import { AuthService } from 'app/auth/src/services/auth.service';

@Controller()
export class AuthConsumer {
    constructor(private readonly authService: AuthService) { }
}