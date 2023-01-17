import { Column, Entity } from "typeorm";
@Entity()
export class rejoinPollEntity {
    @Column()
    PollID:string;
 
    @Column()
    name:string;

    @Column()
    UserID:string;

}