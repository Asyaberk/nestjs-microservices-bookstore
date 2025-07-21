import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"; 

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    id: number;

    //role names like user, admin etc
    @Column()
    name: string;

    //There can be more than one user with a role (but a user can have at most one role.) 
    @OneToMany(() => User, user => user.role)
    users: User[];
}