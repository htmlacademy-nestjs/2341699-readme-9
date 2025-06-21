import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './configurations/app.config';
import rabbitConfig from './configurations/rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class BlogConfigModule {}
