import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {createPollEntity } from 'src/Polls/Entities/createpollEntity.entity'


import { PollsModule } from './Polls/polls.module';
import * as dotenv from 'dotenv';
import { jwtModule } from 'modules.config';



dotenv.config();

@Module({
  imports: [ConfigModule.forRoot(), PollsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'poll_vote',
      entities: [createPollEntity],
      synchronize: true,
      logging: true
    }),
    jwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
