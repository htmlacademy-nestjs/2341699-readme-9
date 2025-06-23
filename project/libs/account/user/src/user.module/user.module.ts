import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/user-models';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [UserRepository, UserFactory],
  exports: [UserRepository],
})
export class UserModule {}
