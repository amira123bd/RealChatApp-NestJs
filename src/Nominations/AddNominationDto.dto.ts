import { IsInt,IsString } from "class-validator";


export class AddNomninationDto{
  

    @IsString()
    pollID:string;

   @IsString()
    userID:string;
 
    @IsString()
    nomination:string;


}