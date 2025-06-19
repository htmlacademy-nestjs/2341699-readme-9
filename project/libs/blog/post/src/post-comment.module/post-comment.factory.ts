import { Injectable } from '@nestjs/common';
import { EntityFactory, PostComment } from '@project/core';
import { PostCommentDto } from './dto/post-comment.dto';
import { PostCommentEntity } from './post-comment.entity';

@Injectable()
export class PostCommentFactory implements EntityFactory<PostCommentEntity> {
  public create(entityPlainData: PostComment): PostCommentEntity {
    return new PostCommentEntity(entityPlainData);
  }

  public createFromDto({ postId, commentText }: PostCommentDto, userId: string) {
    return new PostCommentEntity({
      postId,
      commentText,
      userId,
    } as PostComment);
  }
}
