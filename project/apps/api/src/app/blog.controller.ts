import 'multer';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { InjectUserIdInterceptor } from '@project/interceptors';
import {
  BlogPostQuery,
  PostApiResponseDescription,
  PostCommentApiResponseDescription,
  PostCommentQuery,
  PostDto,
  PostPhotoDto,
} from '@project/post';
import { Express } from 'express';
import ApplicationConfig from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApplicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof ApplicationConfig>,
  ) {}

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_FOUND })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.urls.posts}/${id}`);
    return data;
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POSTS_FOUND })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.urls.posts}`, { params: query });
    return data;
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POSTS_FOUND })
  @Get('/search/:query')
  public async search(@Param('query') query: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.urls.posts}/search/${query}`);
    return data;
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_CREATED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/create')
  public async createPost(
    @Body() dto: PostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (dto.type === PostType.Photo) {
      if (file) {
        const formData = new FormData();
        formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);

        const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.fileVault}/upload`, formData);

        (dto as PostPhotoDto).photoId = data.id;
      } else {
        throw new BadRequestException(`"File" field is required`);
      }
    }

    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.posts}/create`, dto);

    await this.updatePostCountByUserId(dto.userId);

    return data;
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_UPDATED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Put('/update/:id')
  public async updatePost(
    @Param('id') id: string,
    @Body() dto: PostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (dto.type === PostType.Photo) {
      if (file) {
        const formData = new FormData();
        formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);

        const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.fileVault}/upload`, formData);

        (dto as PostPhotoDto).photoId = data.id;
      } else {
        throw new BadRequestException(`"File" field is required`);
      }
    }

    const { data } = await this.httpService.axiosRef.put(`${this.appConfig.urls.posts}/update/${id}`, dto);
    return data;
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_DELETED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/delete/:id')
  public async deletePost(@Param('id') id: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.posts}/delete/${id}`, dto);

    await this.updatePostCountByUserId(dto.userId);

    return data;
  }

  @ApiOkResponse({ type: Post, description: PostApiResponseDescription.POST_REPOSTED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/repost/:id')
  public async repost(@Param('id') id: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.posts}/repost/${id}`, dto);

    await this.updatePostCountByUserId(dto.userId);

    return data;
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_LIKE_ADDED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/addLike/:id')
  public async addLike(@Param('id') id: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.posts}/addLike/${id}`, dto);
    return data;
  }

  @ApiOkResponse({ description: PostApiResponseDescription.POST_LIKE_DELETED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/deleteLike/:id')
  public async deleteLike(@Param('id') id: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.posts}/deleteLike/${id}`, dto);
    return data;
  }

  @ApiOkResponse({ description: PostCommentApiResponseDescription.COMMENT_FOUND })
  @Get('/comments/get')
  public async getComments(@Query() query: PostCommentQuery) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.urls.postComment}`, { params: query });
    return data;
  }

  @ApiOkResponse({ description: PostCommentApiResponseDescription.COMMENT_CREATED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/comments/create')
  public async createComment(@Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.postComment}/create`, dto);
    return data;
  }

  @ApiOkResponse({ description: PostCommentApiResponseDescription.COMMENT_DELETED })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('comments/delete/:id')
  public async deleteComment(@Param('id') id: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.postComment}/delete/${id}`, dto);
    return data;
  }

  // обновление кол-ва постов у пользователя
  private async updatePostCountByUserId(userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.urls.posts}/count/${userId}`);

    await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/update-post-count`, data);
  }
}
