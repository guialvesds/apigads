import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async create(createCardDto: CreateCardDto, desktopId: number): Promise<Card> {
    try {
      const data: Prisma.cardCreateInput = {
        ...createCardDto,
        desktop: { connect: { id: desktopId } },
      };

      const createCardD = await this.prismaService.card.create({ data });

      return {
        ...createCardD,
      };
    } catch (error) {
      console.log('Erro ao criar area de trabalho: ', error);
    }
  }

  findAll() {
    return this.prismaService.card.findMany();
  }

  findOne(id: number) {
    return this.prismaService.card.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return this.prismaService.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  remove(id: number) {
    return this.prismaService.card.delete({
      where: { id },
    });
  }
}
