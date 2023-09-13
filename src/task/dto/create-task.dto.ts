import { task } from '@prisma/client';
import { IsBoolean, IsDate, IsDateString, IsString } from 'class-validator';

export class CreateTaskDto implements task {
  id: number;
  @IsString()
  title: string;
  created_at: Date;
  @IsDateString()
  delivery_date: Date;
  @IsBoolean()
  done: boolean;
  listId: number;
}
