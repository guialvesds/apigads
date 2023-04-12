import { PartialType } from '@nestjs/mapped-types';
import { CreateDesktopDto } from './create-desktop.dto';

export class UpdateDesktopDto extends PartialType(CreateDesktopDto) {}
