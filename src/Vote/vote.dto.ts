import { IsString } from "class-validator";

export class VoteDto {

    @IsString()
    PollID:number;
    @IsString()
    voter: string;
    @IsString()
    choices: string[];
  }