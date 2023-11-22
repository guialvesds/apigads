import { IsString } from 'class-validator';
import { File } from '../entities/file.entity';

export class CreateFileDto implements File {
  id: number;
  fileName: string;
  @IsString()
  fileNameBd: string;
  url: string;
  created_at?: Date;
  contentLength: number;
  filesiZe: any;
  contentType: string;
}
