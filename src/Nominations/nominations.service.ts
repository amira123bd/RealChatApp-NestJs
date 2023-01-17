/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createNominationID } from 'src/Polls/ids';
import { PollsService } from 'src/Polls/polls.service';
import { Repository } from 'typeorm';
import { AddNomninationDto } from './AddNominationDto.dto';
import { nominationsEntity } from './nomination.entity';

@Injectable()
export class NominationsService {

    constructor(
        @InjectRepository(nominationsEntity)
        private nomRepository: Repository<nominationsEntity>,
        private pollsService:PollsService,
        
        ){}


     async addNomination({ pollID,userID,nomination}: AddNomninationDto) {
           
         const entity=this.pollsService.getPoll(pollID);
         if(!entity){
            throw new NotFoundException(`le poll avec ${pollID} n'existe pas!!!!!`);
         }  
         else
         {
            const participant=this.pollsService.getParticipant(pollID,userID);
            if(!participant){
                throw new NotFoundException(`You are not a participant`);
            }
             const id=createNominationID();
            const newnomination = {id,userID,text:nomination}
         }    
          
   }  


}
*/


//add Nomniation(pollid,userid,nomination)
/////{}

//remove nomination(nominationid)

//vote(userid,nominationid) 