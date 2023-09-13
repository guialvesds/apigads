import { Module } from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { ListTaskController } from './list-task.controller';

@Module({
  controllers: [ListTaskController],
  providers: [ListTaskService]
})
export class ListTaskModule {}
