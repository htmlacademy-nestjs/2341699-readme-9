import {
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
import { Token, User } from '@project/core';
import { createJWTPayload } from '@project/helpers';
import { UserRepository } from '@project/user';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { AuthServiceException } from './authentication.const';
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
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }
}
