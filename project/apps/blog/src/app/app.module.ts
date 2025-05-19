import { Module } from '@nestjs/common';
import { BlogConfigModule } from '@project/blog-config';
import { PostModule } from '@project/post';

@Module({
  imports: [PostModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
