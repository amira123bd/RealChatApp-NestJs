import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPollDto } from './DTO/createPollDto.dto';
import { joinPollDto } from './DTO/joinPollDto.dto';
import { createPollEntity } from './Entities/createpollEntity.entity';
import {  createUserID,createPollID } from './ids';
import { POLL} from './POLL';



@Injectable()
export class PollsService {

  private readonly poll: POLL[] = [];
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
async createPoll({topic,name }: createPollDto) {

         const userID=createUserID();
         const PollID=createPollID();

            const Newpoll = {
                id:PollID,
                topic,
                userID:userID,
                AdminID: userID,
                hasStarted:false
              };
        

       const createdPoll= await this.pollRepository.save(Newpoll);
       
       const participants:string[]=[userID];
       
       //creation de poll suivant pollID
       this.poll.push({...Newpoll,participants});
       console.log(this.poll)
      
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
   const {topic,AdminID}=joinedPoll;
   
    const JoinedPoll={
      PollID,
      name,
      userID
    }
     // add the participant to the POLL
    
    this.addParticipant(PollID,userID);
   
   

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

    console.log(this.poll);

}

// rejoin a poll
async rejoinPoll(pollID:string) {
 

  const joinedPoll= await this.pollRepository.findOne({ where: {id:pollID } });
          if(!joinedPoll)
          {throw new NotFoundException(`le poll d'id ${pollID} n'existe pas!!`)}
          return joinedPoll;

  return joinedPoll;
}

//remove participant
async removeParticipant(pollID: string,userID: string,):Promise<POLL[]>
{
  const index=await this.poll.findIndex((p)=>p.id===pollID)

  if(index>=0){
    const participantToRemove=await this.poll[index].participants.findIndex((part)=>part===userID);

    if(participantToRemove){
      await this.poll[index].participants.splice(participantToRemove,1);
    }
    else
  {throw new NotFoundException(`le participant d'id  ${userID} n'existe pas!!!!!`)}
  } 

  else
  {throw new NotFoundException(`le poll d'id ${pollID} n'existe pas!!!!!`)}

  console.log(this.poll);
return this.poll;


}


//add participant

async addParticipant(pollID: string,userID: string):Promise<POLL[]>{
  

  console.log("addddd participant")
const index=await this.poll.findIndex((p)=>p.id===pollID)
console.log(index);

if(index>=0){
  await this.poll[index].participants.push(userID);
}
else
{throw new NotFoundException(`le poll d'id ${pollID} n'existe pas!!!!!`)}

console.log(this.poll)
return this.poll;
  }
 
 
  //get participant

  async getParticipant(pollID:string,userID:string):Promise<number>{

    const index=await this.poll.findIndex((p)=>p.id===pollID)

  if(index>=0){
    const participantIndex=await this.poll[index].participants.findIndex((part)=>part===userID);

    if(participantIndex>=0){
      return participantIndex
      
    }
    else
  {throw new NotFoundException(`le participant d'id  ${userID} n'existe pas!!!!!`)}
  } 

  else
  {throw new NotFoundException(`le poll d'id ${pollID} n'existe pas!!!!!`)}




  }


  //start voting

  async startPoll(PollID:string){
   
    const index=await this.poll.findIndex((p)=>p.id===PollID)
    if(index>=0){
        this.poll[index].hasStarted=true;
    }else
    {throw new NotFoundException(`le poll d'id ${PollID} n'existe pas!!!!!`)}
    
  }

 
 

}
