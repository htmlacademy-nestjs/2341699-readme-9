import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getRabbitMQOptions } from '@project/helpers';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';
import { NotifyPostFactory } from './notify-post.factory';
//import { MailModule } from './mail-module/mail.module';
import { NotifyPostModel, NotifyPostSchema } from './notify-post.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NotifyPostModel.name, schema: NotifyPostSchema }]),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('application.rabbit')),
    //MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService, EmailSubscriberRepository, NotifyPostFactory],
})
export class EmailSubscriberModule {}
