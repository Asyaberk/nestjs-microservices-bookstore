import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) {}

  //to list all roles from the database
  async findAll(): Promise<Role[]> { 
    return this.repo.find();
  }

  //create a role just giving a name in post request
  create(name: string) {
    const role = this.repo.create({ name });
    return this.repo.save(role);
  }
}
