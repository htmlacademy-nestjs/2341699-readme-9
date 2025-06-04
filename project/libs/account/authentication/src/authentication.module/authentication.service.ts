import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@project/user';
import { AuthServiceException } from './authentication.const';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) throw new UnauthorizedException(AuthServiceException.USER_PASSWORD_WRONG);

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthServiceException.USER_PASSWORD_WRONG);
    }

    return existUser;
  }
}
