import { IsEmpty } from "class-validator";
import { isEmpty } from "rxjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";





@Entity('create')
export class createPollEntity {
    @PrimaryGeneratedColumn()
    id:string;


    @Column()
    topic:string;

    @Column()
    votesPervoter : number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
 

    @Column()
    userID:string;

    @Column()
    AdminID:string;


}