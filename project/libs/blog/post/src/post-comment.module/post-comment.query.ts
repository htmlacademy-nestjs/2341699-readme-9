import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { DEFAULT_COMMENT_COUNT_LIMIT, DEFAULT_COMMENT_PAGE_COUNT } from './post-comment.const';

export class PostCommentQuery {
  @ApiProperty({ type: String, description: 'Publication Id' })
  @IsUUID()
  public postId: string;

  @ApiPropertyOptional({ type: Number, description: 'Comments count limit' })
  @Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_COMMENT_COUNT_LIMIT;

  @ApiPropertyOptional({ type: Number, description: 'Current page' })
  @Transform(({ value }) => +value || DEFAULT_COMMENT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_COMMENT_PAGE_COUNT;
}
