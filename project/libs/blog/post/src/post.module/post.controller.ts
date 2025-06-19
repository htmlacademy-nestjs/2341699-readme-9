import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post-dto.type';
import { PostApiResponseDescription, TEST_USER_ID } from './post.const';
import { PostService } from './post.service';

@ApiTags('publications')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_CREATED })
  @Post('/create')
  public async createPost(@Body() dto: PostDto) {
    return await this.postService.create(dto, TEST_USER_ID);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_UPDATED })
  @Put('/update/:id')
  public async updatePost(@Param('id') id: string, @Body() dto: PostDto) {
    return await this.postService.update(id, dto, TEST_USER_ID);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_DELETED })
  @Delete('/delete/:id')
  public async deletePost(@Param('id') id: string) {
    return await this.postService.delete(id, TEST_USER_ID);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_FOUND })
  @Get('/:id')
  public async getPost(@Param('id') id: string) {
    return await this.postService.getById(id);
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_REPOSTED })
  @Post('/repost/:id')
  public async repost(@Param('id') id: string) {
    return await this.postService.repost(id, TEST_USER_ID);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_LIKE_ADDED })
  @Post('/addLike/:id')
  public async addLike(@Param('id') id: string) {
    return await this.postService.addLike(id, TEST_USER_ID);
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_LIKE_DELETED })
  @Post('/deleteLike/:id')
  public async deleteLike(@Param('id') id: string) {
    return await this.postService.deleteLike(id, TEST_USER_ID);
  }

  // todo:
  // получение списка публикаций (пагинация? сортировка? поиск?)
  // будет реализовано в модуле 5
}
