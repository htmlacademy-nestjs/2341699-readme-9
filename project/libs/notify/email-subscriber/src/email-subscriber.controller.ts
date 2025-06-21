import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RabbitRouting } from '@project/core';
import { CreatePostDto } from './dto/create-post.dto';
import { EmailSubscriberService } from './email-subscriber.service';
//import { MailService } from './mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly notifyService: EmailSubscriberService,
    //private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddNewPost,
    queue: 'readme.notify.income',
  })
  public async create(post: CreatePostDto) {
    await this.notifyService.addPost(post);
    //this.subscriberService.addSubscriber(subscriber);
  }
}
