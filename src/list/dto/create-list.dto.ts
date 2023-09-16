import { IsOptional, IsString } from 'class-validator';
import { List } from '../entities/list.entity';

export class CreateListDto implements List {
  id?: number;
  @IsString()
  title: string;
  created_at: Date;
}
