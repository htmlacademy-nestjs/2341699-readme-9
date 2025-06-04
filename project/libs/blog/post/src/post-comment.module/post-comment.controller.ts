import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PostCommentDto } from './dto/post-comment.dto';
import { TEST_USER_ID } from './post-comment.const';
import { PostCommentService } from './post-comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @ApiOkResponse({ description: 'The new post comment has been successfully created' })
  @Post('/create')
  public async createPost(@Body() dto: PostCommentDto) {
    return (await this.postCommentService.create(dto, TEST_USER_ID)).toPOJO();
  }

  @ApiOkResponse({ description: 'The post comment has been successfully deleted' })
  @Delete('/delete/:id')
  public async deletePost(@Param('id') id: string) {
    await this.postCommentService.delete(id, TEST_USER_ID);
  }

  @ApiOkResponse({ description: 'The post comments has been successfully founded' })
  @Get('/:id')
  public async getComments(@Param('id') id: string) {
    return await this.postCommentService.getByPostId(id);
  }
}
