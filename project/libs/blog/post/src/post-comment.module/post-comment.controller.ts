import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PostCommentDto } from './dto/post-comment.dto';
import { TEST_USER_ID } from './post-comment.const';
import { PostCommentQuery } from './post-comment.query';
import { PostCommentService } from './post-comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @ApiOkResponse({ description: 'The post comments has been successfully founded' })
  @Get('/')
  public async index(@Query() query: PostCommentQuery) {
    return await this.postCommentService.getByQuery(query);
  }

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
}
