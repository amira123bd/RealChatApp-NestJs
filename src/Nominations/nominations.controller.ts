import { Body, Controller, Delete, Param, Post, VersioningType } from '@nestjs/common';
import { AddNomninationDto } from './AddNominationDto.dto';
import { NominationsService } from './nominations.service';

@Controller('nominations')
export class NominationsController {

    constructor(private nominamtionsService :NominationsService ){}



    @Post('add')
    async addNomination(
        @Body() addnominationDto:AddNomninationDto
    )
    {
        return await this.nominamtionsService.addNomination(addnominationDto);
    }

    @Delete(':id')
    async deleteNomination(
        @Param('id') nominationId:string
    )
    {
        return await this.nominamtionsService.removeNomination(nominationId);
    }

    @Post('vote')
    async vote(
        @Body() {pollID,userID,nominationId}
    ){
        return await this.nominamtionsService.vote(pollID,userID,nominationId)
    }
}
