import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { UserApiResponseDescription } from './user.const';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: UserApiResponseDescription.USER_CREATED })
  @ApiConflictResponse({ description: UserApiResponseDescription.USER_EXIST })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOkResponse({ type: UserRdo, description: UserApiResponseDescription.USER_FOUND })
  @ApiNotFoundResponse({ description: UserApiResponseDescription.USER_NOT_FOUND })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.userService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }
}
