import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from "typeorm"; 

@Entity('book')
export class Book{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publishedYear: number;

    //control role insert from terminal (@AfterRemove/Update could be added later)
    @AfterInsert()
    logInsert() {
        console.log('Inserted Book with id: ', this.id);
    }
}