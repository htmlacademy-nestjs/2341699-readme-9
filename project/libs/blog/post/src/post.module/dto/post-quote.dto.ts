import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { PostValidatorOptions } from '../post.const';
import { PostBaseDto } from './post-base.dto';

export class PostQuoteDto extends PostBaseDto {
  @ApiProperty({
    description: 'Quote text',
    minLength: PostValidatorOptions.POST_QUOTE_TEXT_MIN_LENGTH,
    maxLength: PostValidatorOptions.POST_QUOTE_TEXT_MAX_LENGTH,
  })
  @ValidateIf((e) => e.type === PostType.Quote)
  @IsString()
  @MinLength(PostValidatorOptions.POST_QUOTE_TEXT_MIN_LENGTH)
  @MaxLength(PostValidatorOptions.POST_QUOTE_TEXT_MAX_LENGTH)
  quoteText?: string;

  @ApiProperty({
    description: 'Quote author',
    minLength: PostValidatorOptions.POST_QUOTE_AUTHOR_MIN_LENGTH,
    maxLength: PostValidatorOptions.POST_QUOTE_AUTHOR_MAX_LENGTH,
  })
  @ValidateIf((e) => e.type === PostType.Quote)
  @IsString()
  @MinLength(PostValidatorOptions.POST_QUOTE_AUTHOR_MIN_LENGTH)
  @MaxLength(PostValidatorOptions.POST_QUOTE_AUTHOR_MAX_LENGTH)
  quoteAuthor?: string;
}
