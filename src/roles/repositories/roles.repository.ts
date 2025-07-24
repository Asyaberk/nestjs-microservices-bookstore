import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';

@Injectable()
// Custom role repository 
export class RolesRepository {
    // Injecting repository to avoid raw SQL and ensure safety
    constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {}

    async find(): Promise<Role[]> {
        return this.roleRepo.find();
    }

    async save(name: string): Promise<Role> {
        const newRole = this.roleRepo.create({ name }); 
        return this.roleRepo.save(newRole); 
    }
}
