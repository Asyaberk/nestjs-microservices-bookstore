import { IsString } from "class-validator";

export class CreateRoleDto{
    
    // validator for creating a role
    @IsString()
    name: string;
}