import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  //import jwt
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      secret: 'cat', 
      signOptions: {expiresIn: '1d'}
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  //we import to provider because we put guard and jwtstrategy is injectable
  providers: [AuthService, JwtStrategy ]
}) 
export class AuthModule {}
