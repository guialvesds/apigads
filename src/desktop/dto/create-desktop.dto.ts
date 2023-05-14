import { IsNumber, IsString } from 'class-validator';
import { Desktop } from '../entities/desktop.entity';

export class CreateDesktopDto extends Desktop {
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  user_id: number;

  created_at: Date;

  link_access: string;
}
