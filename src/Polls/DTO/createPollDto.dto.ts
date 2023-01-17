import { IsInt,IsString, Length, Min,Max  } from "class-validator";
import { createPollID} from '../ids';

export class createPollDto{
   // @IsInt()
   // PollID:number;

    @IsString()
    @Length(5,50)
    topic:string;

    
 
    @IsString()
    @Length(2,25)
    name:string;


}



