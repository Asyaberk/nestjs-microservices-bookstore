import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"; 

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    id: number;

    //role names like user, admin etc
    @Column()
    name: string;

    //Bir role sahip birden fazla user olabilir (bir userın en fazla bir rolü olabilir) 
    @OneToMany(() => User, user => user.role)
    users: User[];
}