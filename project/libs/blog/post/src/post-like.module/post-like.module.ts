import { Module } from '@nestjs/common';
import { PostLikeRepository } from './post-like.repository';

@Module({
  controllers: [],
  providers: [PostLikeRepository],
  exports: [],
})
export class PostLikeModule {}
