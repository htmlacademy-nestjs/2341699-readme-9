import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/file-vault-config';

@Module({
  imports: [FileVaultConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
