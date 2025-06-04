import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/user-models';
import { UserController } from './user.controller';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [UserController],
  providers: [UserRepository, UserFactory, UserService],
  exports: [UserRepository],
})
export class UserModule {}
