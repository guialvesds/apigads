import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  id?: number;

  userId: number;

  @IsString()
  comment_text: string;

  created_at: Date;
}
