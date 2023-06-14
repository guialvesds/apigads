import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupCardService } from './group-card.service';
import { CreateGroupCardDto } from './dto/create-group-card.dto';
import { UpdateGroupCardDto } from './dto/update-group-card.dto';

@Controller('group-card')
export class GroupCardController {
  constructor(private readonly groupCardService: GroupCardService) {}

  @Post()
  create(@Body() createGroupCardDto: CreateGroupCardDto) {
    return this.groupCardService.create(createGroupCardDto);
  }

  @Get()
  findAll() {
    return this.groupCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupCardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupCardDto: UpdateGroupCardDto,
  ) {
    return this.groupCardService.update(+id, updateGroupCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupCardService.remove(+id);
  }
}
