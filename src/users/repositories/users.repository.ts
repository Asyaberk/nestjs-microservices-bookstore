import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "../entities/users.entity";

@Injectable()
export class UserRepository {
    
    //no inject repository
    constructor(private readonly dataSource: DataSource) { }

    //our own repo methods that makes oerations in the db
    //user service
    async find(): Promise<User[]> {
        const query = 'SELECT id, email FROM "user"';
        const result = await this.dataSource.query(query);
        return result;
    }

    //auth service
    async findOneByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM "user" WHERE email = $1 LIMIT 1';
        const result = await this.dataSource.query(query, [email]);
        return result[0] || null;
    }

    async findOneById(id: number): Promise<User | null> {
        const query = 'SELECT * FROM "user" WHERE id = $1 LIMIT 1';
        const result = await this.dataSource.query(query, [id]);
        return result[0] || null;
    }

    async save(user: User): Promise<void> {
        const query = 'INSERT INTO "user"(email, password, "roleId") VALUES($1, $2, $3)';
        await this.dataSource.query(query, [user.email, user.password, user.role.id]);
    }
}