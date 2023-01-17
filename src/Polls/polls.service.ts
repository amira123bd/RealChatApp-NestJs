import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPollDto } from './DTO/createPollDto.dto';
import { joinPollDto } from './DTO/joinPollDto.dto';
import { createPollEntity } from './Entities/createpollEntity.entity';
import { joinPollEntity } from './Entities/joinPollEntity.entity';
import { rejoinPollEntity } from './Entities/rejoinPollEntity.entity';
import {  createUserID,createPollID } from './ids';
import { Participants } from './participants';



@Injectable()
export class PollsService {

  private readonly participants: Participants[] = [];
    constructor(
        @InjectRepository(createPollEntity)
        private pollRepository: Repository<createPollEntity>,
        private jwtService:JwtService,
        ) {
        }



//get a poll
async getPoll(id:string) :Promise<createPollEntity>{
  const entity= await this.pollRepository.findOne({ where: { id} });
          if(!entity)
          {throw new NotFoundException(`le poll d'id ${id} n'existe pas!!`)}
          return entity;
        }
      

//get all polls
async getPolls() :Promise<createPollEntity[]>{
  return await this.pollRepository.find();
}





 // create a poll       
async createPoll({
            
            topic,
            votesPervoter,
            name
          }: createPollDto) {

         const userID=createUserID();
         const PollID=createPollID();

            const Newpoll = {
                id:PollID,
                topic,
                votesPervoter,
                userID:userID,
                AdminID: userID,
              };

       const createdPoll= await this.pollRepository.save(Newpoll);

//jwt auth
        const signedString = this.jwtService.sign(
          {
            pollID: PollID,
            name: name,
          },
          {
            subject: userID,
          },
        );
    
        return {
          poll: createdPoll,
          accessToken: signedString,
        };
            

          }



//join a poll
async joinPoll({PollID,name}:joinPollDto)
{    
    const userID=createUserID();
    const joinedPoll= await this.pollRepository.findOne({ where: { id:PollID} });
    if(!joinedPoll)
    {throw new NotFoundException(`le poll d'id ${PollID} n'existe pas!!`)}
   const {topic,votesPervoter}=joinedPoll;
   
    const JoinedPoll={
      PollID,
      name,
      userID
    }

    this.participants.push({...JoinedPoll,topic,votesPervoter})
    console.log(this.participants);

    //jwt auth
    const signedString = this.jwtService.sign(
      {
        pollID: JoinedPoll.PollID,
        name: JoinedPoll.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: JoinedPoll,
      accessToken: signedString,
    };

}

// rejoin a poll
async rejoinPoll(pollID:string) {
 

  const joinedPoll= await this.pollRepository.findOne({ where: {id:pollID } });
          if(!joinedPoll)
          {throw new NotFoundException(`le poll d'id ${pollID} n'existe pas!!`)}
          return joinedPoll;

  return joinedPoll;
}


 

         


 


}
