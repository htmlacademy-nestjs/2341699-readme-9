import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserValidatorOptions } from '../authentication.const';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'ivanov_ivan@mail.com',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'Ivan',
    minLength: UserValidatorOptions.USER_NAME_MIN_LENGTH,
    maxLength: UserValidatorOptions.USER_NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(UserValidatorOptions.USER_NAME_MIN_LENGTH)
  @MaxLength(UserValidatorOptions.USER_NAME_MAX_LENGTH)
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Ivanov',
    minLength: UserValidatorOptions.USER_NAME_MIN_LENGTH,
    maxLength: UserValidatorOptions.USER_NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(UserValidatorOptions.USER_NAME_MIN_LENGTH)
  @MaxLength(UserValidatorOptions.USER_NAME_MAX_LENGTH)
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    minLength: UserValidatorOptions.USER_PASSWORD_MIN_LENGTH,
    maxLength: UserValidatorOptions.USER_PASSWORD_MAX_LENGTH,
  })
  @MinLength(UserValidatorOptions.USER_PASSWORD_MIN_LENGTH)
  @MaxLength(UserValidatorOptions.USER_PASSWORD_MAX_LENGTH)
  public password: string;

  @ApiPropertyOptional({ description: 'User avatar' })
  @IsString()
  @IsOptional()
  public avatar?: string;
}
