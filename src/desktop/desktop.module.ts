import { Module } from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { DesktopController } from './desktop.controller';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Module({
  controllers: [DesktopController],
  providers: [DesktopService, PrismaService],
})
export class DesktopModule {}
