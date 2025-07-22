import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
//installled bcrypt
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async register(body: CreateUserDto) {
    //10 gücünde şifreleme
        const hashedPassword = await bcrypt.hash(body.password, 10);
        
        const user = this.repo.create({
            email: body.email,
            password: hashedPassword,
            // foreign key
            role: { id: body.roleId }, 
        });

        return this.repo.save(user);
    }
    
}
