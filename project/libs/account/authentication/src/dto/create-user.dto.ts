import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'ivanov_ivan@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'Ivan',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Ivanov',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
  })
  public password: string;
}
