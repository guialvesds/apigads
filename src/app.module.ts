import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma-service/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt_auth.guard';
import { DesktopModule } from './desktop/desktop.module';
import { CardModule } from './card/card.module';
import { GroupCardModule } from './group-card/group-card.module';
import { CommentModule } from './comment/comment.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    DesktopModule,
    CardModule,
    GroupCardModule,
    CommentModule,
    ListModule,
    TaskModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
