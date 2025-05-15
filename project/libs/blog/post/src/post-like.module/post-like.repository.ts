import { Injectable } from '@nestjs/common';
import { PostLike } from '@project/core';
import { BaseMemoryRepository } from '@project/data-access';
import { PostLikeEntity } from './post-like.entity';
import { PostLikeFactory } from './post-like.factory';

@Injectable()
export class PostLikeRepository extends BaseMemoryRepository<PostLikeEntity> {
  constructor(entityFactory: PostLikeFactory) {
    super(entityFactory);
  }

  public countByPostId(postId: string): Promise<number> {
    const entities = Array.from(this.entities.values());
    return Promise.resolve(entities.filter((e) => e.postId === postId).length);
  }

  public getByUserIdAndPostId(userId: string, postId: string): Promise<PostLike | null> {
    const entities = Array.from(this.entities.values());

    const userPostLikeArray = entities.filter((e) => e.postId === postId && e.userId === userId);

    return Promise.resolve(userPostLikeArray.length > 0 ? userPostLikeArray[0] : null);
  }
}
