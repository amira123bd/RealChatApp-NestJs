import { Column, Entity } from "typeorm";
@Entity()
export class joinPollEntity {
    @Column()
    PollID:string;

    @Column()
    userID:string;
 
    @Column()
    name:string;


}