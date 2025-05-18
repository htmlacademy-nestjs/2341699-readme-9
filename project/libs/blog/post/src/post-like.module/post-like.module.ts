import { Module } from '@nestjs/common';
import { PostLikeFactory } from './post-like.factory';
import { PostLikeRepository } from './post-like.repository';

@Module({
  controllers: [],
  providers: [PostLikeFactory, PostLikeRepository],
  exports: [],
})
export class PostLikeModule {}
