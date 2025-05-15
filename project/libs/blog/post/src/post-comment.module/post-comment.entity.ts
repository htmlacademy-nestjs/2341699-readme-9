import { Entity, PostComment, StorableEntity } from '@project/core';

export class PostCommentEntity extends Entity implements StorableEntity<PostComment> {
  public createdAt: Date;
  public userId: string;
  public postId: string;
  public commentText: string;

  constructor(postComment?: PostComment) {
    super();
    this.populate(postComment);
  }

  public populate(postComment?: PostComment): void {
    if (!postComment) return;

    this.id = postComment.id ?? '';
    this.postId = postComment.postId;
    this.createdAt = postComment.createdAt;
    this.userId = postComment.userId;
  }

  toPOJO(): PostComment {
    return {
      id: this.id,
      postId: this.postId,
      createdAt: this.createdAt,
      userId: this.userId,
    } as PostComment;
  }
}
