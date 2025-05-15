import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { UserApiResponseDescription } from './user.constant';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: UserApiResponseDescription.USER_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserApiResponseDescription.USER_EXIST,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: UserApiResponseDescription.USER_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserApiResponseDescription.USER_NOT_FOUND,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.userService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }
}
