import { IsString, Length} from "class-validator";


export class joinPollDto{
 @IsString()
PollID:string;

@IsString()
@Length(5,25)
name:string;}