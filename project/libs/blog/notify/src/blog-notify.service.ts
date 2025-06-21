import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from '@project/blog-config';
import { RabbitRouting } from '@project/core';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async createPost(dto: CreatePostDto) {
    return await this.rabbitClient.publish<CreatePostDto>(this.rabbiOptions.exchange, RabbitRouting.AddNewPost, {
      ...dto,
    });
  }
}
