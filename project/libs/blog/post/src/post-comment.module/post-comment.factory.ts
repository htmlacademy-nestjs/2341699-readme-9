import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { PostCommentEntity } from './post-comment.entity';

@Injectable()
export class PostCommentFactory implements EntityFactory<PostCommentEntity> {
  public create(entityPlainData: PostCommentEntity): PostCommentEntity {
    return new PostCommentEntity(entityPlainData);
  }
}
