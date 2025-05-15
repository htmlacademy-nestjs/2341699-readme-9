import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserFactory, UserService],
  exports: [UserRepository],
})
export class UserModule {}
