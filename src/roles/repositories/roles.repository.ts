import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from '../entities/roles.entity';

@Injectable()
export class RolesRepository {
    //no inject repository
    constructor(private readonly dataSource: DataSource) { }

    //our own repo methods that makes oerations in the db

    async find(): Promise<Role[]> {
        const query = 'SELECT * FROM role';
        const result = await this.dataSource.query(query);
        return result;
    }

    async save(name: string): Promise<Role> {
        const query = 'INSERT INTO role(name) VALUES($1) RETURNING *';
        const result = await this.dataSource.query(query, [name]);
        return result[0];
    }

}
