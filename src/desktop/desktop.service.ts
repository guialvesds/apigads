import { Injectable } from '@nestjs/common';
import { CreateDesktopDto } from './dto/create-desktop.dto';
import { UpdateDesktopDto } from './dto/update-desktop.dto';

@Injectable()
export class DesktopService {
  create(createDesktopDto: CreateDesktopDto) {
    return 'This action adds a new desktop';
  }

  findAll() {
    return `This action returns all desktop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desktop`;
  }

  update(id: number, updateDesktopDto: UpdateDesktopDto) {
    return `This action updates a #${id} desktop`;
  }

  remove(id: number) {
    return `This action removes a #${id} desktop`;
  }
}
