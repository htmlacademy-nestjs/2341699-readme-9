import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostDto } from './dto/post-dto.type';
import { TEST_USER_ID } from './post.const';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  public async createPost(@Body() dto: PostDto) {
    return await this.postService.create(dto, TEST_USER_ID);
  }

  @Put('/update/:id')
  public async updatePost(@Param('id') id: string, @Body() dto: PostDto) {
    return await this.postService.update(id, dto, TEST_USER_ID);
  }

  @Delete('/delete/:id')
  public async deletePost(@Param('id') id: string) {
    await this.postService.delete(id, TEST_USER_ID);
  }

  @Get('/:id')
  public async getPost(@Param('id') id: string) {
    return await this.postService.getById(id);
  }

  @Post('/repost/:id')
  public async repost(@Param('id') id: string) {
    return await this.postService.repost(id, TEST_USER_ID);
  }

  @Post('/addLike/:id')
  public async addLike(@Param('id') id: string) {
    return await this.postService.addLike(id, TEST_USER_ID);
  }

  @Post('/deleteLike/:id')
  public async deleteLike(@Param('id') id: string) {
    return await this.postService.deleteLike(id, TEST_USER_ID);
  }

  // todo:
  // получение списка публикаций (пагинация? сортировка? поиск?)
}
