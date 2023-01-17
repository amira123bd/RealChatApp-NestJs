import { IsInt,IsString, Length, Min,Max  } from "class-validator";
import { createPollID} from '../ids';

export class createPollDto{
   // @IsInt()
   // PollID:number;

    @IsString()
    @Length(5,50)
    topic:string;

    @IsInt()
    @Min(1)
    @Max(4)
    votesPervoter : number;
 
    @IsString()
    @Length(5,25)
    name:string;


}



