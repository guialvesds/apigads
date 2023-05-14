import { IsNumber, IsString } from 'class-validator';
import { Desktop } from '../entities/desktop.entity';

export class CreateDesktopDto extends Desktop {
  id?: number;

  @IsString()
  name: string;

  user_id: number | any;

  created_at: Date;

  link_access: string;
}
