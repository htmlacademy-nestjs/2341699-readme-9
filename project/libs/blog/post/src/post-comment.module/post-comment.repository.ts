import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { PostCommentEntity } from './post-comment.entity';
import { PostCommentFactory } from './post-comment.factory';

@Injectable()
export class PostCommentRepository extends BaseMemoryRepository<PostCommentEntity> {
  constructor(entityFactory: PostCommentFactory) {
    super(entityFactory);
  }
}
