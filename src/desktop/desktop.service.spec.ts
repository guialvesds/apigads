import { Test, TestingModule } from '@nestjs/testing';
import { DesktopService } from './desktop.service';

describe('DesktopService', () => {
  let service: DesktopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesktopService],
    }).compile();

    service = module.get<DesktopService>(DesktopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
