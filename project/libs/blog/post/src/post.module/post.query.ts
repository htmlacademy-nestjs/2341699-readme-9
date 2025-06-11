import { ApiPropertyOptional } from '@nestjs/swagger';
import { PostSortType, PostType, SortDirection } from '@project/core';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE } from './post.const';

export class BlogPostQuery {
  @ApiPropertyOptional({ type: Number, description: 'Publication count limit' })
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @ApiPropertyOptional({ type: Number, description: 'Current page' })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @ApiPropertyOptional({ type: String, description: 'Sort direction' })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiPropertyOptional({ type: String, description: 'Sort by' })
  @IsIn(Object.values(PostSortType))
  @IsOptional()
  public sortBy: PostSortType = DEFAULT_SORT_TYPE;

  @ApiPropertyOptional({ type: String, description: 'Publication type' })
  @IsIn(Object.values(PostType))
  @IsOptional()
  public postType?: PostType;

  @ApiPropertyOptional({ type: String, description: 'Publication tag' })
  @IsString()
  @IsOptional()
  public tag?: string;

  @ApiPropertyOptional({ type: String, description: 'Publication user Id' })
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @ApiPropertyOptional({ type: Boolean, description: 'Show user drafts' })
  @IsBoolean()
  @IsOptional()
  public isDraft?: boolean;
}
