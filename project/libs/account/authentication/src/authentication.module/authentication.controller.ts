import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDescription } from '@project/core';
import { fillDto } from '@project/helpers';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRdo } from '../rdo/user.rdo';
import { AuthenticationService } from './authentication.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ApiResponseDescription.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ApiResponseDescription.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: ApiResponseDescription.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiResponseDescription.LoggedError,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(UserRdo, verifiedUser.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: ApiResponseDescription.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiResponseDescription.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }
}
