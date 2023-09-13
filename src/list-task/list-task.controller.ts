import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { CreateListTaskDto } from './dto/create-list-task.dto';
import { UpdateListTaskDto } from './dto/update-list-task.dto';

@Controller('list-task')
export class ListTaskController {
  constructor(private readonly listTaskService: ListTaskService) {}

  @Post()
  create(@Body() createListTaskDto: CreateListTaskDto) {
    return this.listTaskService.create(createListTaskDto);
  }

  @Get()
  findAll() {
    return this.listTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListTaskDto: UpdateListTaskDto) {
    return this.listTaskService.update(+id, updateListTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listTaskService.remove(+id);
  }
}
