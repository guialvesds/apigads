import { Injectable } from '@nestjs/common';
import { Prisma, task } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createCardDto: CreateCardDto,
    desktopId: number,
    // groupCardId: number,
  ): Promise<Card> {
    try {
      const data: Prisma.cardCreateInput = {
        ...createCardDto,
        desktop: { connect: { id: desktopId } },
        // groupeCard: { connect: { id: groupCardId } },
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
      where: { id: id },
      include: {
        comment: true,
        membersCard: true,
        listTask: {
          include: {
            task: true,
          },
        },
      },
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return this.prismaService.card.update({
      where: { id: id },
      data: updateCardDto,
    });
  }

  remove(id: number) {
    return this.prismaService.card.delete({
      where: { id: id },
    });
  }

  async addMembers(id: number, memberIds: number[]) {
    // Encontra o card pelo ID
    const card = await this.prismaService.card.findUnique({
      where: { id: id },
      include: {
        // Inclue os membros do card para que possamos adicionar os novos membros
        membersCard: true,
      },
    });

    if (!card) {
      throw new Error('Card não encontrado');
    }

    // Verifica se cada membro já faz parte do card e crie uma lista de IDs de membros a serem adicionados
    const membersToAdd = memberIds.filter((idMember) => {
      return !card.membersCard.some((member) => member.id === idMember);
    });

    // Se não houver membros para adicionar, retorne o card atual
    if (membersToAdd.length === 0) {
      return card;
    }

    // Adiciona os novos membros ao array de membros do card
    const updatedCard = await this.prismaService.card.update({
      where: { id: id },
      data: {
        membersCard: {
          connect: membersToAdd.map((idMember) => ({ id: idMember })),
        },
      },
      include: {
        membersCard: true,
      },
    });

    return updatedCard;
  }

  async removeMember(cardId: number, memberId: number) {
    // Encontra o card pelo ID
    const card = await this.prismaService.card.findUnique({
      where: { id: cardId },
      include: {
        membersCard: true,
      },
    });

    if (!card) {
      throw new Error('Card não encontrado');
    }

    // Verifica se o membro faz parte do card
    const memberToRemove = card.membersCard.find(
      (member) => member.id === memberId,
    );

    if (!memberToRemove) {
      throw new Error('Membro não encontrado no card');
    }

    // Remove o membro do card
    const updatedCard = await this.prismaService.card.update({
      where: { id: cardId },
      data: {
        membersCard: {
          disconnect: [{ id: memberId }],
        },
      },
      include: {
        membersCard: true,
      },
    });

    return updatedCard;
  }
}
