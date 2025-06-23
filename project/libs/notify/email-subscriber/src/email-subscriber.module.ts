import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getRabbitMQOptions } from '@project/helpers';
import { UserRepository } from '@project/user';
import { PrismaClientModule } from '@project/user-models';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';
import { MailModule } from './mail-module/mail-module';
import { NotifyPostFactory } from './notify-post.factory';
import { NotifyPostModel, NotifyPostSchema } from './notify-post.model';

@Module({
  imports: [
    PrismaClientModule,
    MailModule,
    MongooseModule.forFeature([{ name: NotifyPostModel.name, schema: NotifyPostSchema }]),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('application.rabbit')),
  ],
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService, EmailSubscriberRepository, NotifyPostFactory, UserRepository],
})
export class EmailSubscriberModule {}
