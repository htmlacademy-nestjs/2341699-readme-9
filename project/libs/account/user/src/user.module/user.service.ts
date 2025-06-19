import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthUser } from '@project/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UserServiceException } from './user.const';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, avatar } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) throw new ConflictException(UserServiceException.USER_EXISTS);

    const user: AuthUser = {
      email,
      firstname,
      lastname,
      avatar,
      createdAt: new Date(),
      passwordHash: '',
      publicationsCount: 0,
      subscribersCount: 0,
    };

    const userEntity = await new UserEntity(user).setPassword(password);

    await this.userRepository.create(userEntity);

    return userEntity;
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException(UserServiceException.USER_NOT_FOUND);

    return user;
  }
}
