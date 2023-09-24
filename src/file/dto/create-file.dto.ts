import { File } from '../entities/file.entity';

export class CreateFileDto implements File {
  id: number;
  fileName: string;
  fileNameBd: string;
  url: string;
  created_at: Date;
  contentLength: number;
  contentType: string;
}
