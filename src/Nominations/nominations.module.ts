import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollsModule } from 'src/Polls/polls.module';
import { PollsService } from 'src/Polls/polls.service';
import { nominationsEntity } from './nomination.entity';
import { NominationsController } from './nominations.controller';
import { NominationsService } from './nominations.service';

@Module({
    imports: [ConfigModule.forRoot(),
        TypeOrmModule.forFeature(
          [nominationsEntity]
          ),PollsModule],
    
      controllers: [NominationsController],
      
      providers: [NominationsService],
})
export class NominationsModule {}
