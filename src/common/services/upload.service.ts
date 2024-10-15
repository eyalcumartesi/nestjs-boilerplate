import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    // Initialize the S3 client using the new AWS SDK
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    const storageDriver = this.configService.get<string>('STORAGE_DRIVER');

    if (storageDriver === 's3') {
      // Configure AWS S3 storage using the latest AWS SDK
      return {
        storage: multerS3({
          s3: this.s3,
          bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
          acl: 'public-read',
          key: (req, file, cb) => {
            const fileName = `${Date.now().toString()}-${file.originalname}`;
            cb(null, fileName);
          },
        }),
      };
    } else {
      // Local development - store files in the local filesystem
      return {
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = this.configService.get<string>('UPLOAD_PATH');
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const fileName = `${Date.now().toString()}-${file.originalname}`;
            cb(null, fileName);
          },
        }),
      };
    }
  }
}
