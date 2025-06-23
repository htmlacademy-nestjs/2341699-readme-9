import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { BlogNotifyModule } from '@project/blog-notify';
import { PostLikeRepository } from '../post-like.module/post-like.repository';
import { PostController } from './post.controller';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [PrismaClientModule, BlogNotifyModule],
  controllers: [PostController],
  providers: [PostRepository, PostService, PostFactory, PostLikeRepository],
  exports: [PostRepository],
})
export class PostModule {}
