import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('card/list/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':idList')
  create(
    @Param('idList') idList: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(idList, createTaskDto);
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Patch(':id/addMember/:userIds')
  async addMember(
    @Param('id') idTask: number,
    @Param('userIds') userIds: string,
  ) {
    // Você precisará dividir a string userIds em um array de números.
    const userIdsArray = userIds.split(',').map(Number);

    try {
      const updatedCard = await this.taskService.addMembers(
        idTask,
        userIdsArray,
      );
      return { message: 'Membros adicionados com sucesso', task: updatedCard };
    } catch (error) {
      return { message: error.message }; // Lidar com erros adequados aqui
    }
  }

  @Patch(':id/removeMember/:userId')
  async removeMmeber(
    @Param('id') idTask: number,
    @Param('userId') userId: number,
  ) {
    try {
      const updateCard = await this.taskService.removeMember(idTask, userId);

      return { message: 'Membro removido com sucesso!', task: updateCard };
    } catch (error) {
      return { message: error.message };
    }
  }
}
