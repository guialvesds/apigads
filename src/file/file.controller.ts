import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { config } from './multer-config';
import { CreateFileDto } from './dto/create-file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('card/:cardId')
  @UseInterceptors(FileInterceptor('arquivo', config.multerConfig))
  async uploadArquivo(
    @UploadedFile() file: Express.MulterS3.File,
    @Param() cardId: any,
  ) {
    const savedFile = await this.fileService.createFileCard(file, cardId);
    return savedFile;
  }

  @Post('card/plus/:cardId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'arquivo' }], config.multerConfig),
  )
  async uploadVariosArquivos(
    @UploadedFiles() files: Express.MulterS3.File[],
    @Param() cardId: number,
  ) {
    const savedFiles = await this.fileService.createFileCardPlus(
      files['arquivo'],
      cardId,
    );
    return savedFiles;
  }

  @Get()
  async findAll() {
    const files = this.fileService.findAll();
    return files;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const file = this.fileService.findOne(+id);
    return file;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFileDto: CreateFileDto) {
    const updatedFile = this.fileService.update(+id, updateFileDto);
    return updatedFile;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deletedFile = await this.fileService.remove(+id);

    if (!deletedFile) {
      throw new NotFoundException(`Arquivo com ID ${id} não encontrado.`);
    }

    return { message: 'Arquivo excluído com sucesso' };
  }
}
