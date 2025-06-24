import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/account-config';
import { AuthUser, PostCount, Token, User } from '@project/core';
import { createJWTPayload } from '@project/helpers';
import { UserEntity, UserRepository } from '@project/user';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { AuthServiceException } from './authentication.const';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) throw new UnauthorizedException(AuthServiceException.USER_PASSWORD_WRONG);

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthServiceException.USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };

    try {
      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(accessTokenPayload),
        this.jwtService.signAsync(refreshTokenPayload, {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      // удаляем сессию из бд в случае ошибки
      await this.refreshTokenService.deleteRefreshSession(refreshTokenPayload.tokenId);
      throw new HttpException('Error creating token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const { currentPassword, newPassword } = dto;
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new UnauthorizedException(AuthServiceException.USER_PASSWORD_WRONG);
    }

    if (!(await existUser.comparePassword(currentPassword))) {
      throw new UnauthorizedException(AuthServiceException.USER_PASSWORD_WRONG);
    }

    await existUser.setPassword(newPassword);

    await this.userRepository.update(existUser);

    return existUser;
  }

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, avatar } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) throw new ConflictException(AuthServiceException.USER_EXIST);

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

    if (!user) throw new NotFoundException(AuthServiceException.USER_NOT_FOUND);

    return user;
  }

  public async updatePostCount({ userId, postCount }: PostCount) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(AuthServiceException.USER_NOT_FOUND);

    user.publicationsCount = postCount;
    await this.userRepository.update(user);
  }

  public async addSubscriber(userId: string, subscriberId: string) {
    return await this.userRepository.addSubsriber(userId, subscriberId);
  }

  public async deleteSubscriber(userId: string, subscriberId: string) {
    return await this.userRepository.deleteSubsriber(userId, subscriberId);
  }
}
