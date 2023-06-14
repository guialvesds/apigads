import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupCardDto } from './create-group-card.dto';

export class UpdateGroupCardDto extends PartialType(CreateGroupCardDto) {}
