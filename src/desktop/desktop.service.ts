import { User } from './../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateDesktopDto } from './dto/create-desktop.dto';
import { UpdateDesktopDto } from './dto/update-desktop.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { Desktop } from './entities/desktop.entity';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Injectable()
export class DesktopService {
  constructor(private prismaService: PrismaService) {}

  async create(
    @CurrentUser() user: User,
    createDesktopDto: CreateDesktopDto,
  ): Promise<Desktop> {
    try {
      const dataIni: Prisma.desktopCreateInput = {
        ...createDesktopDto,
        user_id: user.id,
      };

      const data = {
        ...dataIni,
        link_access: `http://localhost:3000/desktop`,
      };

      console.log(user);

      const createdDesktop = await this.prismaService.desktop.create({ data });

      return {
        ...createdDesktop,
      };
    } catch (error) {
      console.log('Erro ao criar area de trabalho: ', error);
    }
  }

  findAll() {
    return this.prismaService.desktop.findMany();
  }

  findOne(id: number) {
    return this.prismaService.desktop.findUnique({
      where: { id },
      include: { card: true },
    });
  }

  update(id: number, updateUserDto: UpdateDesktopDto) {
    return this.prismaService.desktop.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.desktop.delete({
      where: { id },
    });
  }
}
