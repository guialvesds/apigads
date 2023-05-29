import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { CreateDesktopDto } from './dto/create-desktop.dto';
import { UpdateDesktopDto } from './dto/update-desktop.dto';
import { AuthRequest } from 'src/auth/models/AuthRequest';

@Controller('desktop')
export class DesktopController {
  constructor(private readonly desktopService: DesktopService) {}

  @Post()
  create(
    @Request() req: AuthRequest,
    @Body() createDesktopDto: CreateDesktopDto,
  ) {
    return this.desktopService.create(req.user, createDesktopDto);
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

  @Patch(':id/addMember/:userId')
  async addMemberToDesktop(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.desktopService.addMemberToDesktop(+id, +userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desktopService.remove(+id);
  }
}
