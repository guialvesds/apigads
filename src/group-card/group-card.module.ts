import { Module } from '@nestjs/common';
import { GroupCardService } from './group-card.service';
import { GroupCardController } from './group-card.controller';

@Module({
  controllers: [GroupCardController],
  providers: [GroupCardService]
})
export class GroupCardModule {}
