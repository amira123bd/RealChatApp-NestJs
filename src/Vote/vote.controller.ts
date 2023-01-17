import { Controller, Post } from "@nestjs/common";
import { VoteService } from "./vote.service";


@Controller('vote')
export class VoteController {
  constructor(private readonly votingService: VoteService ) {}


}