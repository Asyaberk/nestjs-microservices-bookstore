import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; 
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    
    //create a new user
    create(email: string, password: string, roleId: number) {
        const user = this.repo.create({
            email,
            password,
            //foreign key roleid
            role: { id: roleId }
        });
        return this.repo.save(user);
    }

    //to list all roles from the database
    async findAll(): Promise<User[]> { 
        return this.repo.find();
    }
}
 