import { Test, TestingModule } from '@nestjs/testing';
import { DesktopController } from './desktop.controller';
import { DesktopService } from './desktop.service';

describe('DesktopController', () => {
  let controller: DesktopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesktopController],
      providers: [DesktopService],
    }).compile();

    controller = module.get<DesktopController>(DesktopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
