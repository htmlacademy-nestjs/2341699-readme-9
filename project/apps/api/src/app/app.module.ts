import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './app.config';
import { BlogController } from './blog.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UsersController } from './users.controller';

const ENV_FILE_PATH = 'apps/api/api.env';
const HTTP_CLIENT_TIMEOUT = 3000;
const HTTP_CLIENT_MAX_REDIRECTS = 5;

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  controllers: [UsersController, BlogController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
