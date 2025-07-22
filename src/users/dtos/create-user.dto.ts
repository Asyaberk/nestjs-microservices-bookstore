import { IsEmail, IsString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsOptional()
  roleId?: number;
}
