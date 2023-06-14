import { Test, TestingModule } from '@nestjs/testing';
import { GroupCardController } from './group-card.controller';
import { GroupCardService } from './group-card.service';

describe('GroupCardController', () => {
  let controller: GroupCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupCardController],
      providers: [GroupCardService],
    }).compile();

    controller = module.get<GroupCardController>(GroupCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
