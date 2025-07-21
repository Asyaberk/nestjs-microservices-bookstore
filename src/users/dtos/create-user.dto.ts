import { IsEmail, IsString, IsInt } from "class-validator";

export class CreateUserDto{

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    roleId: number;
}