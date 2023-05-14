import { PartialType } from '@nestjs/mapped-types';
import { CreateDesktopDto } from './create-desktop.dto';
import { IsString } from 'class-validator';

export class UpdateDesktopDto extends PartialType(CreateDesktopDto) {
  id?: number;

  @IsString()
  name: string;

  user_id: number | any;

  created_at: Date;

  link_access: string;
}
