import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '12345',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'ivanov_ivan@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'Ivan',
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Ivanov',
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User avatar',
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'User registration date',
  })
  @Expose()
  public createAt: string;

  @ApiProperty({
    description: 'User posts amount',
    example: '0',
  })
  @Expose()
  public publicationsCount: number;

  @ApiProperty({
    description: 'User subscribers amount',
    example: '0',
  })
  @Expose()
  public subscribersCount: number;

  @ApiProperty({
    description: 'User subscribers',
    example: ['12344', '12345'],
  })
  @Expose()
  public subscribers?: string[];

  @ApiProperty({
    description: 'User subscriptions',
    example: ['12344', '12345'],
  })
  @Expose()
  public subscriptions?: string[];
}
