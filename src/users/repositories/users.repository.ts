import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
// Custom user repository
export class UserRepository {
    // Injecting repository to avoid raw sql and ensure safety
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    async find(): Promise<User[]> {
        return this.userRepo.find({
            select: ['id', 'email'], 
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({
            where: { email },
            relations: ['role'], 
        });
    }

    async findOneById(id: number): Promise<User | null> {
        return this.userRepo.findOne({
            where: { id },
            relations: ['role'],
        });
    }

    async save(user: Partial<User>): Promise<User> {
        const newUser = this.userRepo.create(user); 
        return this.userRepo.save(newUser); 
    }
}
