import { IsOptional, IsString } from 'class-validator';
import { Card } from '../entities/card.entity';

export class CreateCardDto extends Card {
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description?: string;

  created_at: Date;

  @IsOptional()
  delivery_date?: Date;
}
