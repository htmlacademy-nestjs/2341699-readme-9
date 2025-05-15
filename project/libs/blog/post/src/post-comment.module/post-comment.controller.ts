import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostCommentDto } from './dto/post-comment.dto';
import { TEST_USER_ID } from './post-comment.const';
import { PostCommentService } from './post-comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post('/create')
  public async createPost(@Body() dto: PostCommentDto) {
    return await this.postCommentService.create(dto, TEST_USER_ID);
  }

  @Delete('/delete/:id')
  public async deletePost(@Param('id') id: string) {
    await this.postCommentService.delete(id, TEST_USER_ID);
  }

  @Get('/post/:id')
  public async getComments(@Param('id') id: string) {
    await this.postCommentService.getByPostId(id);
  }
}
