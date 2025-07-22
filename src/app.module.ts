import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/users.entity';
import { Role } from './roles/entities/roles.entity';

//PostgreSQL imports
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'dbpostgre',
    host: 'localhost',
    port: 5432,
    username: 'asya',
    password: 'Asya1234',
    //Entites: User and Role table 
    entities: [User, Role],
    synchronize: true, 
  }),
    AuthModule,
    UsersModule,
    RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
