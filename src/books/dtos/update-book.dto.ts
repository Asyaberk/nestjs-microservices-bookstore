import { IsString, IsOptional, IsInt } from "class-validator";

//everything is optinal
export class UpdateBookDto {
   @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsInt()
    publishedYear?: number;
}
