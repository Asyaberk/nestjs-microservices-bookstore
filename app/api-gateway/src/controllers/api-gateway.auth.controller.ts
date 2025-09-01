import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiBadRequestResponse, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ApiGatewayAuthService } from "../services/api-gateway.auth.service";
import { CreateUserDto, LoginUserDto } from "@app/dtos";
import { Response } from 'express';

@Controller('auth')
export class ApiGatewayAuthController {
  constructor(private readonly apiGatewayService: ApiGatewayAuthService) {}

  @Post('/register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    schema: {
      example: {
        userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: { id: 1, email: 'user@mail.com' },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Registration failed: Email is already registered or invalid data.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Registration failed: This email is already registered!',
        error: 'Bad Request',
      },
    },
  })
  async register(@Body() body: CreateUserDto, @Req() req: any) {
    return this.apiGatewayService.proxyPost('/auth/register', body, req);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    schema: {
      example: {
        message: 'SUCCESS: Logged in!',
        user: { id: 1, email: 'user@mail.com', role: 'admin' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Login failed: Invalid email or password.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Login failed: Password is incorrect!',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() body: LoginUserDto, @Req() req: any, @Res({ passthrough: true }) res: Response) {
    const { data } = await this.apiGatewayService.proxyPost('/auth/login', body, req);
    if (data?.token) {
      res.cookie('jwt', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    return data;
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'User logout' })
  @ApiOkResponse({
    description: 'User logged out successfully.',
    schema: {
      example: { message: 'SUCCESS: Logged out!' },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: No active session.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized: No active session.',
        error: 'Unauthorized',
      },
    },
  })
  async logout(@Req() req: any) {
    return this.apiGatewayService.proxyPost('/auth/logout', {}, req);
  }

  @Get('/whoami')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOkResponse({
    description: 'Returns the details of the currently logged-in user.',
    schema: {
      example: { id: 1, email: 'user@example.com', role: { name: 'admin' } },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Token is missing or invalid.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  whoAmI(@Req() req: any) {
    return this.apiGatewayService.proxyGet('/auth/whoami', req);
  }
}