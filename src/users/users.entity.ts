import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"; 
import { Role } from "src/roles/roles.entity";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    //A user can have at most one role (but there can be more than one user with a role)
    @ManyToOne(() => Role, role => role.users)
    role: Role;

}