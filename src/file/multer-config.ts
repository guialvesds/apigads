//multer-config.ts
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { env } from 'process';

const s3Config = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: env.CHAVE_ACESSO_AWS,
    secretAccessKey: env.CHAVE_ACESSO_SECRETA_AWS,
  },
});

export const multerConfig = {
  storage: multerS3({
    s3: s3Config,
    bucket: env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      // Verificando a extensão do arquivo
      const allowedExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.docx',
        '.xlsx',
        '.txt',
      ];
      const fileExt = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(fileExt)) {
        return cb(new Error('Tipo de arquivo não suportado.'));
      }

      // Verificando o tamanho do arquivo (2MB no máximo)
      if (file.size > 2 * 1024 * 1024) {
        return cb(new Error('Tamanho máximo do arquivo é 2MB.'));
      }

      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export const config = {
  s3Config: s3Config,
  multerConfig: multerConfig,
};
