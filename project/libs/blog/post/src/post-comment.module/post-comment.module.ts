import { Module } from '@nestjs/common';
import { PostCommentFactory } from './post-comment.factory';
import { PostCommentRepository } from './post-comment.repository';
import { PostCommentService } from './post-comment.service';

@Module({
  controllers: [],
  providers: [PostCommentFactory, PostCommentService, PostCommentRepository],
  exports: [],
})
export class PostCommentModule {}
