import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostCount, UserIdDto } from '@project/core';
import { fillDto } from '@project/helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthApiResponseDescription } from './authentication.const';
import { AuthenticationService } from './authentication.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { RequestWithTokenPayload } from './request-with-token-payload';
import { RequestWithUser } from './request-with-user';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('password')
  public async changePassword(@Body() dto: ChangePasswordDto, @Req() { user: payload }: RequestWithTokenPayload) {
    if (!payload) throw new Error();

    const updatedUser = await this.authService.changePassword(payload.sub, dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

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

  @ApiCreatedResponse({ description: AuthApiResponseDescription.USER_CREATED })
  @ApiConflictResponse({ description: AuthApiResponseDescription.USER_EXIST })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOkResponse({ type: UserRdo, description: AuthApiResponseDescription.USER_FOUND })
  @ApiNotFoundResponse({ description: AuthApiResponseDescription.USER_NOT_FOUND })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @ApiNoContentResponse()
  @Post('update-post-count')
  public async updatePostCount(@Body() dto: PostCount) {
    return await this.authService.updatePostCount(dto);
  }

  @ApiNoContentResponse()
  @Post('/subscribe/:userId')
  public async subscribe(@Param('userId') userId: string, @Body() dto: UserIdDto) {
    return await this.authService.addSubscriber(userId, dto.userId);
  }

  @ApiNoContentResponse()
  @Post('/unsubscribe/:userId')
  public async unsubscribe(@Param('userId') userId: string, @Body() dto: UserIdDto) {
    return await this.authService.deleteSubscriber(userId, dto.userId);
  }
}
