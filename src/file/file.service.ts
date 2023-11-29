import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';
import { env } from 'process';
import { S3 } from '@aws-sdk/client-s3';
import { Prisma } from '@prisma/client';

@Injectable()
export class FileService {
  private readonly s3: S3;

  constructor(private readonly prisma: PrismaService) {
    this.s3 = new S3({
      region: 'sa-east-1',
      credentials: {
        accessKeyId: env.CHAVE_ACESSO_AWS,
        secretAccessKey: env.CHAVE_ACESSO_SECRETA_AWS,
      },
    });
  }

  async createFileCard(
    file: Express.MulterS3.File,
    cardIdObj: any,
  ): Promise<File | undefined> {
    try {
      const cardId = cardIdObj.cardId; // Extraindo o valor de cardId do objeto

      // Removendo espaços em branco no início e no final e caracteres não numéricos
      const cleanedCardId = cardId.trim().replace(/[^0-9]/g, '');

      const parsedCardId = parseInt(cleanedCardId, 10);

      if (isNaN(parsedCardId)) {
        console.error('CardId não é um número válido.');
        return undefined;
      }

      const fileData: Prisma.fileCreateInput = {
        fileName: file.key,
        fileNameBd: file.key,
        contentLength: file.size,
        contentType: file.mimetype,
        url: file.location,
        card: { connect: { id: parsedCardId } },
      };

      if (fileData.contentLength > 2 * 1024 * 1024) {
        throw new Error('Arquivo não suportado');
      }

      const createdFile = await this.prisma.file.create({ data: fileData });
      console.log('File created:', createdFile);
      return createdFile;
    } catch (error) {
      console.error('Error creating file:', error);
      throw error;
    }
  }

  async createFileCardPlus(
    files: Express.MulterS3.File[],
    cardId: number,
  ): Promise<File[]> {
    const arrayArquivos = files.map((file) => {
      return {
        fileName: file.key,
        fileNameBd: file.key,
        contentLength: file.size,
        contentType: file.mimetype,
        url: file.location,
        cardId: cardId, // Usando cardId em vez de card
      };
    });

    // Salva os arquivos no banco de dados
    await this.prisma.file.createMany({
      data: arrayArquivos,
    });

    // Consulta os arquivos recém-criados no banco de dados
    const savedFiles = await this.prisma.file.findMany({
      where: {
        fileName: {
          in: arrayArquivos.map((arquivo) => arquivo.fileName),
        },
      },
    });

    return savedFiles;
  }

  async findAll(): Promise<File[]> {
    const files = await this.prisma.file.findMany();
    return files;
  }

  async findOne(id: number): Promise<File | null> {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });
    return file;
  }

  async update(id: number, updateFileDto: CreateFileDto): Promise<File | null> {
    const updatedFile = await this.prisma.file.update({
      where: { id },
      data: updateFileDto,
    });
    return updatedFile;
  }

  async remove(id: number): Promise<File | null> {
    // Consultando o arquivo que será excluído
    const fileToDelete = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!fileToDelete) {
      return null; // Arquivo não encontrado
    }

    // Excluindo o arquivo do S3
    const s3Key = fileToDelete.fileName;
    await this.deleteFileFromS3(s3Key);

    console.log(s3Key);

    // Excluindo o registro do arquivo do banco de dados
    const deletedFile = await this.prisma.file.delete({
      where: { id },
    });

    return deletedFile;
  }

  async deleteFileFromS3(s3Key: string): Promise<void> {
    try {
      this.s3.deleteObject({
        Bucket: env.BUCKET,
        Key: s3Key, // Chave do arquivo no S3
      });
    } catch (error) {
      console.error(`Erro ao excluir arquivo do S3: ${error.message}`);
      throw error;
    }
  }
}
