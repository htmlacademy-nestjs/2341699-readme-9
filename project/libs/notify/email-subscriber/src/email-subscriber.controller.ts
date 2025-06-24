import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';
import { RabbitRouting } from '@project/core';
import { CreatePostDto } from './dto/create-post.dto';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  constructor(private readonly notifyService: EmailSubscriberService) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddNewPost,
    queue: 'readme.notify.income',
  })
  public async create(post: CreatePostDto) {
    await this.notifyService.addPost(post);
  }

  @Get('/send-notifications')
  public async sendNotifications() {
    return await this.notifyService.sendNotifications();
  }
}
