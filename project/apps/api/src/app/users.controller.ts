import 'multer';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiNoContentResponse } from '@nestjs/swagger';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from '@project/authentication';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { Express } from 'express';
import ApplicationConfig from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApplicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof ApplicationConfig>,
  ) {}

  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${this.appConfig.urls.auth}/${id}`);
    return data;
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    avatar?: Express.Multer.File,
  ) {
    // загрузка файла аватара
    if (avatar) {
      const formData = new FormData();

      formData.append('file', new Blob([avatar.buffer], { type: avatar.mimetype }), avatar.originalname);

      const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.fileVault}/upload`, formData);

      dto.avatar = data.id;
    }

    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/register`, dto);
    return data;
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/login`, dto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseInterceptors)
  @Post('password')
  public async changePassword(@Body() dto: ChangePasswordDto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/password`, dto);
    return data;
  }

  @ApiNoContentResponse()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/subscribe/:userId')
  public async subscribe(@Param('userId') userId: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/subscribe/${userId}`, dto);
    return data;
  }

  @ApiNoContentResponse()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/unsubscribe/:userId')
  public async unsubscribe(@Param('userId') userId: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(`${this.appConfig.urls.auth}/unsubscribe/${userId}`, dto);
    return data;
  }
}
