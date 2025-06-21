import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthenticationProperty } from '../authentication.const';

export class LoggedUserRdo {
  @Expose()
  @ApiProperty(AuthenticationProperty.Id.Description)
  public id: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.Email.Description)
  public email: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.AccessToken.Description)
  public accessToken: string;

  @Expose()
  @ApiProperty(AuthenticationProperty.RefreshToken.Description)
  public refreshToken: string;
}
