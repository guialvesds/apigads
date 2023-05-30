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
    @CurrentUser() user: User | any,
    createDesktopDto: CreateDesktopDto,
  ): Promise<Desktop> {
    try {
      const dataIni: Prisma.desktopCreateInput = {
        ...createDesktopDto,
        user_id: user.id,
        created_by: user.name,
        membersDesktop: { connect: [{ id: user.id }] },
      };
      const data = {
        ...dataIni,
        link_access: 'undefined',
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
    return this.prismaService.desktop.findMany({
      include: { card: true, membersDesktop: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.desktop.findUnique({
      where: { id: id },
      include: { card: true, membersDesktop: true },
    });
  }

  // Futura logica para se implementar

  // findOne(id: number, loggedInUserEmail: string) {
  //   return this.prismaService.desktop.findUnique({
  //     where: { id: id },
  //     include: { card: true, membersDesktop: true },
  //     where: {
  //       membersDesktop: {
  //         some: {
  //           email: loggedInUserEmail,
  //         },
  //       },
  //     },
  //   });
  // }

  update(id: number, updateUserDto: UpdateDesktopDto) {
    return this.prismaService.desktop.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.desktop.delete({
      where: { id: id },
    });
  }

  async addMemberToDesktop(
    desktopId: number,
    userId: number,
  ): Promise<Desktop> {
    try {
      const desktop = await this.prismaService.desktop.findUnique({
        where: { id: desktopId },
      });

      if (!desktop) {
        throw new Error('Desktop não encontrado');
      }

      const user = await this.prismaService.users.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const updatedDesktop = await this.prismaService.desktop.update({
        where: { id: desktopId },
        data: { membersDesktop: { connect: { id: userId } } },
        include: { membersDesktop: true },
      });

      return updatedDesktop;
    } catch (error) {
      console.log('Erro ao adicionar membro ao desktop: ', error);
      throw error;
    }
  }
}
