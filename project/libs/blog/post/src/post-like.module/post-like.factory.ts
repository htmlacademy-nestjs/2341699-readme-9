import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { PostLikeEntity } from './post-like.entity';

@Injectable()
export class PostLikeFactory implements EntityFactory<PostLikeEntity> {
  public create(entityPlainData: PostLikeEntity): PostLikeEntity {
    return new PostLikeEntity(entityPlainData);
  }
}
