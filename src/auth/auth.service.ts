import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
//installled bcrypt
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

@Injectable()
export class AuthService {
    //jwt web token
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService
    ) { }

    //register function
    async register(body: CreateUserDto) {
        //check if email is in use
        const emailInUse = await this.repo.findOne({where: { email: body.email }});
        if (emailInUse) {
            throw new BadRequestException('ERROR: Email already in use!')
        }
        //hash
        const hashedPassword = await bcrypt.hash(body.password, 10);
        //create and save user
        const user = this.repo.create({
            email: body.email,
            password: hashedPassword, 
            role: { id: body.roleId }, 
        });
        await this.repo.save(user);
        return this.createToken(user.email);
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
        const { email, password } = body;
        //find if user exists by email
        const user = await this.repo.findOne({ where: { email: body.email } });
        if (!user) {
            throw new UnauthorizedException('ERROR: Invalid credentials!');
        }

        //compare entered passwords with existing password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException('ERROR: Invalid credentials!');
        }

        //generate JWT tokens
        const jwt = await this.createToken(user);

        //store in cookie
        response.cookie('jwt', jwt, { httpOnly: true });

        return { message: 'SUCCESS: Logged in!' };
    }

    //logout function
    logout(response) {
        response.clearCookie('jwt');
        return { message: 'SUCCESS: Logged out!' };
    }

    //whoAmI function yeter
    async whoAmI(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.repo.findOne({ where: { id: data.sub } });
            
            return user;

        } catch (err) {
            console.log(`ERROR: ${err}`);
            throw new UnauthorizedException('ERROR: Invalid or expired token!');
        }
    }
}
