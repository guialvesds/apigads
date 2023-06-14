import { Injectable } from '@nestjs/common';
import { CreateGroupCardDto } from './dto/create-group-card.dto';
import { UpdateGroupCardDto } from './dto/update-group-card.dto';

@Injectable()
export class GroupCardService {
  create(createGroupCardDto: CreateGroupCardDto) {
    return 'This action adds a new groupCard';
  }

  findAll() {
    return `This action returns all groupCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupCard`;
  }

  update(id: number, updateGroupCardDto: UpdateGroupCardDto) {
    return `This action updates a #${id} groupCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupCard`;
  }
}
