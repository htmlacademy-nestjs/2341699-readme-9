import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { PostValidatorOptions } from '../post.const';
import { PostBaseDto } from './post-base.dto';

export class PostTextDto extends PostBaseDto {
  @ApiProperty({
    type: String,
    description: 'Text title',
    minLength: PostValidatorOptions.POST_TEXT_TITLE_MIN_LENGHT,
    maxLength: PostValidatorOptions.POST_TEXT_TITLE_MAX_LENGHT,
  })
  @ValidateIf((e) => e.type === PostType.Text)
  @IsString()
  @MinLength(PostValidatorOptions.POST_TEXT_TITLE_MIN_LENGHT)
  @MaxLength(PostValidatorOptions.POST_TEXT_TITLE_MAX_LENGHT)
  textTitle?: string;

  @ApiProperty({
    type: String,
    description: 'Text announcement',
    minLength: PostValidatorOptions.POST_TEXT_ANNOUNCEMENT_MIN_LENGHT,
    maxLength: PostValidatorOptions.POST_TEXT_ANNOUNCEMENT_MAX_LENGHT,
  })
  @ValidateIf((e) => e.type === PostType.Text)
  @IsString()
  @MinLength(PostValidatorOptions.POST_TEXT_ANNOUNCEMENT_MIN_LENGHT)
  @MaxLength(PostValidatorOptions.POST_TEXT_ANNOUNCEMENT_MAX_LENGHT)
  textAnnouncement?: string;

  @ApiProperty({
    type: String,
    description: 'Text',
    minLength: PostValidatorOptions.POST_TEXT_MIN_LENGHT,
    maxLength: PostValidatorOptions.POST_TEXT_MAX_LENGHT,
  })
  @ValidateIf((e) => e.type === PostType.Text)
  @IsString()
  @MinLength(PostValidatorOptions.POST_TEXT_MIN_LENGHT)
  @MaxLength(PostValidatorOptions.POST_TEXT_MAX_LENGHT)
  text?: string;
}
