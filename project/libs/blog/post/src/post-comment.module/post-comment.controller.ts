import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserIdDto } from '../post.module/dto/userId.dto';
import { PostCommentDto } from './dto/post-comment.dto';
import { PostCommentApiResponseDescription } from './post-comment.const';
import { PostCommentQuery } from './post-comment.query';
import { PostCommentService } from './post-comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @ApiOkResponse({ description: PostCommentApiResponseDescription.COMMENT_FOUND })
  @Get('/')
  public async index(@Query() query: PostCommentQuery) {
    return await this.postCommentService.getByQuery(query);
  }

  @ApiOkResponse({ description: PostCommentApiResponseDescription.COMMENT_CREATED })
  @Post('/create')
  public async createComment(@Body() dto: PostCommentDto) {
    return (await this.postCommentService.create(dto)).toPOJO();
  }

  @ApiOkResponse({ description: PostCommentApiResponseDescription.COMMENT_DELETED })
  @Post('/delete/:id')
  public async deleteComment(@Param('id') id: string, @Body() { userId }: UserIdDto) {
    await this.postCommentService.delete(id, userId);
  }
}
