import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { PostValidatorOptions } from '../post.const';
import { PostBaseDto } from './post-base.dto';

export class PostVideoDto extends PostBaseDto {
  @ApiProperty({
    type: String,
    description: 'Video title',
    minLength: PostValidatorOptions.POST_VIDEO_TITLE_MIN_LENGHT,
    maxLength: PostValidatorOptions.POST_VIDEO_TITLE_MAX_LENGHT,
  })
  @ValidateIf((e) => e.type === PostType.Video)
  @IsString()
  @MinLength(PostValidatorOptions.POST_VIDEO_TITLE_MIN_LENGHT)
  @MaxLength(PostValidatorOptions.POST_VIDEO_TITLE_MAX_LENGHT)
  @IsOptional()
  @IsNotEmpty()
  videoTitle?: string;

  @ApiProperty({
    type: String,
    description: 'Video link (URL)',
  })
  @ValidateIf((e) => e.type === PostType.Video)
  @IsString()
  @IsUrl()
  videoUrl?: string;
}
