import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'User email',
    example: 'ivanov_ivan@mail.com',
  })
  public email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'User firstname',
    example: 'Ivan',
  })
  public firstname: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'User lastname',
    example: 'Ivanov',
  })
  public lastname: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'User password',
    example: '12345678',
  })
  public password: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'User avatar',
  })
  public avatar: string;
}
