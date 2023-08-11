import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  id?: number;

  userId: number;

  @IsOptional()
  comment_text: string;

  created_at: Date;
}
