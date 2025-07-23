import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/users/repositories/users.repository';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  //import jwt
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      secret: 'cat', 
      signOptions: {expiresIn: '1d'}
    }),
    PassportModule,
    RolesModule
  ],
  controllers: [AuthController],
  //we import to provider because we put guard and jwtstrategy is injectable
  providers: [AuthService, JwtStrategy, UserRepository ]
}) 
export class AuthModule {}
