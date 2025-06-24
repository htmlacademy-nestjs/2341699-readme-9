import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostStatus, PostType } from '@project/core';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PostValidatorOptions } from '../post.const';

export class PostBaseDto {
  @ApiProperty({ type: String, description: 'User id' })
  userId: string;

  @ApiProperty({ type: String, description: 'Publication type' })
  @IsEnum(PostType)
  type: PostType;

  @ApiProperty({ type: String, description: 'Publication status' })
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({ type: String, description: 'Publication date' })
  @ValidateIf((e) => e.id !== undefined)
  @IsDate()
  publicationDate?: Date;

  @ApiPropertyOptional({ type: Array, description: 'Publication tags' })
  @ValidateIf((o) => o.tags !== undefined)
  @IsArray()
  @ArrayMaxSize(PostValidatorOptions.POST_TAGS_ARRAY_MAX_SIZE)
  @MinLength(PostValidatorOptions.POST_TAGS_MIN_LENGTH, { each: true })
  @MaxLength(PostValidatorOptions.POST_TAGS_MAX_LENGTH, { each: true })
  @IsString({ each: true })
  @Matches(/^[a-zA-Zа-яА-ЯЁё].*/, { each: true })
  @IsOptional()
  tags?: string[];
}
