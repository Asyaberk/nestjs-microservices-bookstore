import { Book } from "src/books/entities/books.entity";
import { User } from "src/users/entities/users.entity";
import { AfterInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('rental')
export class Rental {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, { eager: true })
    user: User;

    @ManyToOne(() => Book, (book) => book.id, { eager: true })
    book: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    rentDate: Date;

    /* //i may add this later for practicing kafka with countdown rental date 
    @Column({ type: 'timestamp' })
    endDate: Date; */

    @AfterInsert()
    logInsert() {
        console.log('Inserted Rental with id:', this.id);
    }
}
