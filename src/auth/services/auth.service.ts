import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
//installled bcrypt
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { UserRepository } from 'src/users/repositories/users.repository';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
    //jwt web token
    //own user repo
    constructor(
        private readonly repo: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    //register function
    async register(body: CreateUserDto) {
        //check if email is in use
        const emailInUse = await this.repo.findOneByEmail(body.email);
        if (emailInUse) {
            throw new BadRequestException('ERROR: Email already in use!')
        }
        //hash
        const hashedPassword = await bcrypt.hash(body.password, 10);
        //create and save user
        const user = {
            email: body.email,
            password: hashedPassword, 
            role: { id: body.roleId }, 
        } as User;
        await this.repo.save(user);

        const userToken = await this.createToken(user.email)
        return {
            userToken,
            user: { id: user.id, email: user.email}
        };
    } 

    //Token creation
    //We receive the token from the user for each request, validate it, and use it for permission.
    async createToken(user): Promise<string> {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
    }


    //login fuction yeter
    async login(body: LoginUserDto, response) {

        //find if user exists by email
        const user = await this.repo.findOneByEmail(body.email);
        if (!user) {
            throw new UnauthorizedException('ERROR: Invalid credentials!');
        }

        //compare entered passwords with existing password
        const passwordMatch = await bcrypt.compare(body.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('ERROR: Invalid credentials!');
        }

        //generate JWT tokens
        const jwt = await this.createToken(user);

        //store in cookie
        response.cookie('jwt', jwt, { httpOnly: true });

        return {
            message: 'SUCCESS: Logged in!',
            user: { id: user.id, email: user.email, role: user.role.name }
        };
    }

    //logout function
    logout(response) {
        response.clearCookie('jwt');
        return { message: 'SUCCESS: Logged out!' };
    }
}
