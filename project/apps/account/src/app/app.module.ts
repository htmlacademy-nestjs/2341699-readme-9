import { Module } from '@nestjs/common';
import { AccountConfigModule } from '@project/account-config';
import { AuthenticationModule } from '@project/authentication';
import { UserModule } from '@project/user';

@Module({
  imports: [UserModule, AuthenticationModule, AccountConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
