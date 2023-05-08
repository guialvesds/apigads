import { Module } from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { DesktopController } from './desktop.controller';
import { PrismaModule } from 'src/prisma-service/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DesktopController],
  providers: [DesktopService],
})
export class DesktopModule {}
