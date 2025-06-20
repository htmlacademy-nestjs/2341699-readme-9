import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './configurations/file-vault.config';

const ENV_USERS_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class FileVaultConfigModule {}
