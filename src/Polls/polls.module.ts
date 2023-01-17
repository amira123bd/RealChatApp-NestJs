import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtModule } from 'modules.config';
import { createPollEntity } from './Entities/createpollEntity.entity';
import { PollsController } from './polls.controller';
import { PollsGateway } from './polls.gateway';
import { PollsService } from './polls.service';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forFeature(
      [createPollEntity ]
      ),jwtModule],

  controllers: [PollsController],
  
  providers: [PollsService,PollsGateway],
})
export class PollsModule {

}
