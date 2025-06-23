import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  @ApiProperty({
    description: 'User ID',
    example: '2c5ea4c0-4067-11ec-9e99-8f0b7c0f93d1',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@example.ru',
  })
  public email: string;

  @Expose()
  @ApiProperty({ description: 'User access token' })
  public accessToken: string;

  @Expose()
  @ApiProperty({ description: 'User refresh token' })
  public refreshToken: string;
}
