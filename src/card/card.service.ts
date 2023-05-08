import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    try {
      const data: Prisma.cardCreateInput = {
        ...createCardDto,
      };

      const createCard = await this.prismaService.card.create({ data });

      return {
        ...createCard,
      };
    } catch (error) {
      console.log('Erro ao criar usuáro: ', error);
    }
  }

  findAll() {
    return `This action returns all card`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
