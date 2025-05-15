import { Entity, PostLike, StorableEntity } from '@project/core';

export class PostLikeEntity extends Entity implements StorableEntity<PostLike> {
  public postId: string;
  public userId: string;
  public createdAt: Date;

  constructor(postLIke?: PostLike) {
    super();
    this.populate(postLIke);
  }

  public populate(postLIke?: PostLike): void {
    if (!postLIke) return;

    this.id = postLIke.id ?? '';
    this.postId = postLIke.postId;
    this.createdAt = postLIke.createdAt;
    this.userId = postLIke.userId;
  }

  toPOJO(): PostLike {
    return {
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    } as PostLike;
  }
}
