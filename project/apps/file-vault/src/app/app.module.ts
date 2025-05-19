import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/file-vault-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [FileVaultConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
