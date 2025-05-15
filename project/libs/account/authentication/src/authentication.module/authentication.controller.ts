import { Body, Controller, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { UserRdo } from '../../../user/src/user.module/rdo/user.rdo';
import { AuthApiResponseDescription } from './authentication.const';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOkResponse({ type: UserRdo, description: AuthApiResponseDescription.LOGGED_SUCCESS })
  @ApiNotFoundResponse({ description: AuthApiResponseDescription.LOGGED_ERROR })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(UserRdo, verifiedUser.toPOJO());
  }
}
