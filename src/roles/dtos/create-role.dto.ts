import { IsString } from "class-validator";

export class CreateRoleDto{

    //We made a validator in case we want to add it to the role in the future, 
    // but for now we will use the data entered manually into the database
    
    @IsString()
    name: string;
}