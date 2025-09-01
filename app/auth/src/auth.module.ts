import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'app/roles/src/roles.module';
import { UsersModule } from 'app/users/src/users.module';

@Module({
  //import jwt
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallbackSecret',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RolesModule,
    UsersModule,
  ],
  controllers: [AuthController],
  //we import to provider because we put guard and jwtstrategy is injectable
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
