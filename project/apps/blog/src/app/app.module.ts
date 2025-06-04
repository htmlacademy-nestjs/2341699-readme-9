import { Module } from '@nestjs/common';
import { BlogConfigModule } from '@project/blog-config';
import { PostCommentModule, PostModule } from '@project/post';

@Module({
  imports: [PostModule, BlogConfigModule, PostCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
