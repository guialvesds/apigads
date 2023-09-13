import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class ListService {
  constructor(private prismaService: PrismaService) {}

  async create(cardId: number, createListDto: CreateListDto): Promise<List> {
    try {
      const data: Prisma.listCreateInput = {
        ...createListDto,
        card: { connect: { id: cardId } },
      };

      const createdList = await this.prismaService.list.create({ data });

      return createdList;
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    return this.prismaService.list.findMany({
      include: { task: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.list.findUnique({
      where: { id: id },
      include: { task: true },
    });
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.prismaService.list.update({
      where: { id: id },
      data: updateListDto,
    });
  }

  remove(id: number) {
    return this.prismaService.list.delete({
      where: { id: id },
    });
  }
}
