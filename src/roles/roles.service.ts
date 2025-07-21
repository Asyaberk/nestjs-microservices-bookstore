import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,) {}

  //to list all roles from the database
  async findAll(): Promise<Role[]> { 
    return this.roleRepo.find();
  }

  //create a role just giving a name in post request
  create(name: string) {
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save(role);
  }
}
