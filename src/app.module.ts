import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {createPollEntity } from 'src/Polls/Entities/createpollEntity.entity'


import { PollsModule } from './Polls/polls.module';
import * as dotenv from 'dotenv';
import { jwtModule } from 'modules.config';
import { NominationsModule } from './Nominations/nominations.module';
import { nominationsEntity } from './nominations/nomination.entity';



dotenv.config();

@Module({
  imports: [ConfigModule.forRoot(), PollsModule,NominationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'poll_vote2',
      entities: [createPollEntity,nominationsEntity],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    jwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
