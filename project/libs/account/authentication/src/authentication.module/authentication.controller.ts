import { Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthApiResponseDescription } from './authentication.const';
import { AuthenticationService } from './authentication.service';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { RequestWithTokenPayload } from './request-with-token-payload';
import { RequestWithUser } from './request-with-user';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOkResponse({ type: LoggedUserRdo, description: AuthApiResponseDescription.LOGGED_SUCCESS })
  @ApiUnauthorizedResponse({ description: AuthApiResponseDescription.LOGGED_ERROR })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    if (!user) throw new UnauthorizedException(AuthApiResponseDescription.LOGGED_ERROR);

    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiOkResponse({
    description: AuthApiResponseDescription.REFRESH_TOKEN,
  })
  @ApiUnauthorizedResponse({
    description: AuthApiResponseDescription.LOGGED_ERROR,
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    if (!user) throw new UnauthorizedException(AuthApiResponseDescription.LOGGED_ERROR);

    return await this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
