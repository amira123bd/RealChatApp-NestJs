import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import { Body, Delete, Get, Param, Req, UseGuards } from '@nestjs/common/decorators';
import { ControllerAuthGuard } from './co-auth.guard';

import { createPollDto } from './DTO/createPollDto.dto';
import { joinPollDto } from './DTO/joinPollDto.dto';
import { RequestWithAuth } from './ids';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {

    constructor(private pollsService :PollsService ){}


//create a poll
    @Post('create')
    async create(
        @Body() CreatePollDto :createPollDto
    ){
        
        return await this.pollsService.createPoll(CreatePollDto);
    }


//join a poll
    @Post('/join')
  async join(@Body() joinPollDto: joinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }




    // get all polls
    @Get('getpoll')
    async getpoll(
        
    ){
        return await this.pollsService.getPolls();
    }
   

    //get a poll by id
   @Get(':id')
   async getpollbypollid( @Param('id') id:string)
     { 
        return await this.pollsService.getPoll(id);
     }



@Delete('delete')
async deleteparticipant(
    @Body() {PollID,userID}
)     
{
    const result =await this.pollsService.removeParticipant(PollID,userID)
}

// rejoin a poll


@UseGuards(ControllerAuthGuard)
@Post('/rejoin')
async rejoin(@Req() request: RequestWithAuth) {
  const { userID, pollID, name } = request;
  const result = await this.pollsService.rejoinPoll( pollID);

  return result;
}




    
    
   

}
