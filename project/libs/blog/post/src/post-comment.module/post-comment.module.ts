import { Module } from '@nestjs/common';
import { PostCommentController } from './post-comment.controller';
import { PostCommentFactory } from './post-comment.factory';
import { PostCommentRepository } from './post-comment.repository';
import { PostCommentService } from './post-comment.service';

@Module({
  controllers: [PostCommentController],
  providers: [PostCommentFactory, PostCommentService, PostCommentRepository],
  exports: [],
})
export class PostCommentModule {}
