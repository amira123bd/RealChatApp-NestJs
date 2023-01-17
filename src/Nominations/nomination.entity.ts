
/*import { createPollEntity } from "src/Polls/Entities/createpollEntity.entity";
import { Column, Entity,ManyToOne,PrimaryColumn } from "typeorm";


@Entity('nominations')
export class nominationsEntity {
    @PrimaryColumn()
    id:string;
    
   // @Column()
   // PollID:string;


    @Column()
    userID:string;

    @Column()
    text: number;

    @Column()
    vote: number=0;
 
    @ManyToOne(
        type => createPollEntity,
        (poll) => poll.nominations,
        {
          cascade: ['insert', 'update'],
          nullable: true,
          eager: true
        }
      )
      poll: createPollEntity;


}*/