import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PostDto } from './dto/post-dto.type';
import { UserIdDto } from './dto/userId.dto';
import { PostApiResponseDescription } from './post.const';
import { BlogPostQuery } from './post.query';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOkResponse({ description: PostApiResponseDescription.POSTS_FOUND })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    return await this.postService.getAllPosts(query);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POSTS_FOUND })
  @Get('/search/:query')
  public async search(@Param('query') query: string) {
    return await this.postService.search(query);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_CREATED })
  @Post('/create')
  public async createPost(@Body() dto: PostDto, @Req() req: Request) {
    return await this.postService.create(dto, req);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_UPDATED })
  @Put('/update/:id')
  public async updatePost(@Param('id') id: string, @Body() dto: PostDto) {
    return await this.postService.update(id, dto);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_DELETED })
  @Post('/delete/:id')
  public async deletePost(@Param('id') id: string, @Body() { userId }: UserIdDto) {
    return await this.postService.delete(id, userId);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_FOUND })
  @Get('/:id')
  public async getPost(@Param('id') id: string) {
    return await this.postService.getById(id);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_REPOSTED })
  @Post('/repost/:id')
  public async repost(@Param('id') id: string, @Body() { userId }: UserIdDto) {
    return await this.postService.repost(id, userId);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_LIKE_ADDED })
  @Post('/addLike/:id')
  public async addLike(@Param('id') id: string, @Body() { userId }: UserIdDto) {
    return await this.postService.addLike(id, userId);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_LIKE_DELETED })
  @Post('/deleteLike/:id')
  public async deleteLike(@Param('id') id: string, @Body() { userId }: UserIdDto) {
    return await this.postService.deleteLike(id, userId);
  }

  @Get('/count/:userId')
  public async getPostCount(@Param('userId') userId: string) {
    return await this.postService.getPostCountByUserId(userId);
  }
}
