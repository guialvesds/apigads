import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}
  async create(idList: number, createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const data: Prisma.taskCreateInput = {
        ...createTaskDto,
        taskList: { connect: { id: idList } },
      };

      const createdTask = await this.prismaService.task.create({ data });

      return createdTask;
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    return this.prismaService.task.findMany({
      include: {
        // Inclue os membros do card para que possamos adicionar os novos membros
        membersTask: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.task.findUnique({
      where: { id: id },
      include: {
        // Inclue os membros do card para que possamos adicionar os novos membros
        membersTask: true,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id: id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({
      where: { id: id },
    });
  }

  async addMembers(id: number, memberIds: number[]) {
    // Encontra a task pelo ID
    const task = await this.prismaService.task.findUnique({
      where: { id: id },
      include: {
        // Inclue os membros do card para que possamos adicionar os novos membros
        membersTask: true,
      },
    });

    if (!task) {
      throw new Error('task não encontrado');
    }

    // Verifica se cada membro já faz parte do card e crie uma lista de IDs de membros a serem adicionados
    const membersToAdd = memberIds.filter((idMember) => {
      return !task.membersTask.some((member) => member.id === idMember);
    });

    // Se não houver membros para adicionar, retorne a task atual
    if (membersToAdd.length === 0) {
      return task;
    }

    // Adiciona os novos membros ao array de membros do card
    const updatedCard = await this.prismaService.task.update({
      where: { id: id },
      data: {
        membersTask: {
          connect: membersToAdd.map((idMember) => ({ id: idMember })),
        },
      },
      include: {
        membersTask: true,
      },
    });

    return updatedCard;
  }

  async removeMember(cardId: number, memberId: number) {
    // Encontra o card pelo ID
    const card = await this.prismaService.task.findUnique({
      where: { id: cardId },
      include: {
        membersTask: true,
      },
    });

    if (!card) {
      throw new Error('Card não encontrado');
    }

    // Verifica se o membro faz parte do card
    const memberToRemove = card.membersTask.find(
      (member) => member.id === memberId,
    );

    if (!memberToRemove) {
      throw new Error('Membro não encontrado no card');
    }

    // Remove o membro do card
    const updatedCard = await this.prismaService.task.update({
      where: { id: cardId },
      data: {
        membersTask: {
          disconnect: [{ id: memberId }],
        },
      },
      include: {
        membersTask: true,
      },
    });

    return updatedCard;
  }
}
