import { IsNumber, IsString } from 'class-validator';
import { ListTask } from '../entities/list-task.entity';

export class CreateListTaskDto extends ListTask {
  @IsString()
  title: string;

  @IsNumber()
  created_by?: number;
}
