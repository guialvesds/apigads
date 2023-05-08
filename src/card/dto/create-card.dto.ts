import { Card } from '../entities/card.entity';
import { IsString } from 'class-validator';

export class CreateCardDto extends Card {
  @IsString()
  title: string;

  description?: string;

  created_at: Date;

  delivery_date?: Date;
}
