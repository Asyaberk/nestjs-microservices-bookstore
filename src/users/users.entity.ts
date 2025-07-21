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

    //Bir userın en fazla bir rolü olabilir (bir role sahip birden fazla user olabilir)
    @ManyToOne(() => Role, role => role.users)
    role: Role;

}