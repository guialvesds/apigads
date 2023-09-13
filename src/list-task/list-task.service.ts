import { Injectable } from '@nestjs/common';
import { CreateListTaskDto } from './dto/create-list-task.dto';
import { UpdateListTaskDto } from './dto/update-list-task.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class ListTaskService {
  constructor(private prismaService: PrismaService) {}
  create(createListTaskDto: CreateListTaskDto) {
    try {
      const data: Prisma.listTaskCreateInput = {
        ...createListTaskDto,
        name: '',
      };

      return data;
    } catch (error) {
      return console.error(error.message);
    }
    return 'This action adds a new listTask';
  }

  findAll() {
    return `This action returns all listTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listTask`;
  }

  update(id: number, updateListTaskDto: UpdateListTaskDto) {
    return `This action updates a #${id} listTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} listTask`;
  }
}
