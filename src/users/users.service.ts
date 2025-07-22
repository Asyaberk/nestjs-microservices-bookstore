import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; 
import { User } from './users.entity';

@Injectable()
export class UsersService {

    //ayrı repo oluşturulacak
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    //list all roles from the database
    async findAll(): Promise<User[]> { 
        return this.repo.find();
    }
}
 