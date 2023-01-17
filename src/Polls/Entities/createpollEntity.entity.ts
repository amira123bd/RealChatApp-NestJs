import { IsEmpty } from "class-validator";
import { isEmpty } from "rxjs";
import { nominationsEntity } from "src/nominations/nomination.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('create')
export class createPollEntity {
    @PrimaryColumn()
    id:string;


    @Column()
    topic:string;

   

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
 

    @Column()
    userID:string;

    @Column()
    AdminID:string;

    @Column()
    hasStarted:boolean;

    @OneToMany(
        type => nominationsEntity,
        (nomination) => nomination.poll,
        {
          nullable: true,
          cascade: true
        }
      )
      nominations: nominationsEntity[];


}