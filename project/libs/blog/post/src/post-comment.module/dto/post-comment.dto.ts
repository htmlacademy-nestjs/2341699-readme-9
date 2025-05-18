import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostCommentValidatorOptions } from '../post-comment.const';

export class PostCommentDto {
  @ApiProperty({ type: String, description: 'Post ID' })
  @IsString()
  postId?: string;

  @ApiProperty({
    type: String,
    description: 'Comment text',
    minLength: PostCommentValidatorOptions.COMMENT_TEXT_MIN_LENGTH,
    maxLength: PostCommentValidatorOptions.COMMENT_TEXT_MAX_LENGTH,
  })
  @IsString()
  @MinLength(PostCommentValidatorOptions.COMMENT_TEXT_MIN_LENGTH)
  @MaxLength(PostCommentValidatorOptions.COMMENT_TEXT_MAX_LENGTH)
  commentText: string;
}
