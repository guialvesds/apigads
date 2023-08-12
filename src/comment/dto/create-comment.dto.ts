import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  id?: number;

  userId: number;

  userName: string;

  @IsOptional()
  userAvatar: string;

  @IsOptional()
  comment_text: string;

  created_at: Date;
}
