import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':id')
  create(
    @Body() createCardDto: CreateCardDto,
    @Param('id') id: number,
    // @Param('groupCardId') groupCardId: number,
  ) {
    return this.cardService.create(createCardDto, id);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cardService.remove(+id);
  }

  @Patch(':id/addMember/:userIds')
  async addMember(
    @Param('id') idCard: number,
    @Param('userIds') userIds: string,
  ) {
    // Você precisará dividir a string userIds em um array de números.
    const userIdsArray = userIds.split(',').map(Number);

    try {
      const updatedCard = await this.cardService.addMembers(
        idCard,
        userIdsArray,
      );
      return { message: 'Membros adicionados com sucesso', card: updatedCard };
    } catch (error) {
      return { message: error.message }; // Lidar com erros adequados aqui
    }
  }

  @Patch(':id/removeMember/:userId')
  async removeMmeber(
    @Param('id') idCard: number,
    @Param('userId') userId: number,
  ) {
    try {
      const updateCard = await this.cardService.removeMember(idCard, userId);

      return { message: 'Membro removido com sucesso!', card: updateCard };
    } catch (error) {
      return { message: error.message };
    }
  }
}
