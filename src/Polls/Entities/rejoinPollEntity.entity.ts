import { Column, Entity } from "typeorm";
@Entity()
export class rejoinPollEntity {
    @Column()
    PollID:number;
 
    @Column()
    name:string;

    @Column()
    UserID:string;

}