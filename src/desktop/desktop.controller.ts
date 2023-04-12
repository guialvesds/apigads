import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { CreateDesktopDto } from './dto/create-desktop.dto';
import { UpdateDesktopDto } from './dto/update-desktop.dto';

@Controller('desktop')
export class DesktopController {
  constructor(private readonly desktopService: DesktopService) {}

  @Post()
  create(@Body() createDesktopDto: CreateDesktopDto) {
    return this.desktopService.create(createDesktopDto);
  }

  @Get()
  findAll() {
    return this.desktopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desktopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesktopDto: UpdateDesktopDto) {
    return this.desktopService.update(+id, updateDesktopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desktopService.remove(+id);
  }
}
