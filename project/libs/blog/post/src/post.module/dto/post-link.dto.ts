import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { PostValidatorOptions } from '../post.const';
import { PostBaseDto } from './post-base.dto';

export class PostLinkDto extends PostBaseDto {
  @ApiProperty({
    description: 'Link URL',
  })
  @ValidateIf((e) => e.type === PostType.Link)
  @IsString()
  @IsNotEmpty()
  linkUrl?: string;

  @ApiPropertyOptional({
    description: 'Link description',
    maxLength: PostValidatorOptions.POST_LINK_DESCRIPTION_MAX_LENGTH,
  })
  @ValidateIf((e) => e.type === PostType.Link)
  @IsString()
  @MaxLength(PostValidatorOptions.POST_LINK_DESCRIPTION_MAX_LENGTH)
  linkDescription?: string;
}
