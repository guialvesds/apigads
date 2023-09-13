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
    return this.prismaService.task.findMany();
  }

  findOne(id: number) {
    return this.prismaService.task.findUnique({
      where: { id: id },
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
}
