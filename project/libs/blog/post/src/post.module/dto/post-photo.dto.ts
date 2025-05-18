import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PostBaseDto } from './post-base.dto';

export class PostPhotoDto extends PostBaseDto {
  @ApiProperty({
    description: 'Photo file ID',
  })
  @ValidateIf((e) => e.type === PostType.Photo)
  @IsString()
  @IsNotEmpty()
  photoId?: string;
}
