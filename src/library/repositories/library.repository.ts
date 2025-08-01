import { InjectRepository } from "@nestjs/typeorm";
import { Rental } from "../entities/rental.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class LibraryRepository {
    constructor(@InjectRepository(Rental) private readonly repo: Repository<Rental>) { }

}