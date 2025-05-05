import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from '@project/core';
import { UserEntity, UserRepository } from '@project/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password } = dto;

    const user: AuthUser = {
      email,
      firstname,
      lastname,
      avatar: undefined,
      createAt: new Date(),
      passwordHash: '',
      publicationsCount: 0,
      subscribers: [],
      subscriptions: [],
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }
}
