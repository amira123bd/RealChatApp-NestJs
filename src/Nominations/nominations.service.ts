import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { createPollEntity } from 'src/Polls/Entities/createpollEntity.entity';

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

/// ajouter des nominations 
     async addNomination(nomin: AddNomninationDto):Promise<nominationsEntity> {
           
       ; const { pollID,userID,nomination}=nomin;
         const entity=await this.pollsService.getPoll(pollID);

         if(entity){
            const participant=await this.pollsService.getParticipant(pollID,userID);
            if(participant)
            {
                const id=createNominationID();
                
                console.log(participant)
                console.log({id,userID,nomination})

                return await this.nomRepository.save({id,userID,vote:0,pollID:pollID,nomination});
                
            }
            throw new NotFoundException(`You are not a participant`);
         }  
         throw new NotFoundException(`le poll avec ${pollID} n'existe pas!!!!!`);
       
            
             }    


/// supprimer des nominations
         async removeNomination(nominationid:string){
            
            return await this.nomRepository.delete(nominationid);

         } 
         
         
/// vote on nomination 

        async vote(pollID:string,userID:string,nominationid:string) :Promise<nominationsEntity>
        {
            const userindex=await this.pollsService.getParticipant(pollID,userID);
            if(userindex){
                const nom=await this.nomRepository.findOne({where:{id:nominationid}})
                nom.vote++;
                return nom;
            }
            throw new NotFoundException(`You are not a participant`);
           
        }


///result 
       
       // async getResult(entity:createPollEntity)
       // {
         //   const nom=await this.nomRepository.find(
          //      {where:[{entity.pollID:pollid}]}
           // );
       // } 


//vote(userid,nominationid)
//find userid 
//find nomination id and vote ++

          
   }  






//add Nomniation(pollid,userid,nomination)
/////{}

//remove nomination(nominationid)

//vote(userid,nominationid) 