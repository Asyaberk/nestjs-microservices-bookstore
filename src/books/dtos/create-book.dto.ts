import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsInt()
    @IsOptional()
    publishedYear?: number;
}
