import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaClientModule } from '@project/file-vault-models';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderService } from './file-uploader.service';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    PrismaClientModule,
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
  ],
  controllers: [FileUploaderController],
  providers: [FileUploaderService, FileUploaderRepository, FileUploaderFactory],
})
export class FileUploaderModule {}
