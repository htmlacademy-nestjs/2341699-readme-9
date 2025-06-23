import { Injectable } from '@nestjs/common';
import { UserRepository } from '@project/user';
import { CreatePostDto } from './dto/create-post.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailService } from './mail-module/mail.service';
import { NotifyPostEntity } from './notify-post.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

  public async addPost(post: CreatePostDto) {
    const notifyPostEntity = new NotifyPostEntity(post);
    await this.emailSubscriberRepository.save(notifyPostEntity);

    return notifyPostEntity;
  }

  public async sendNotifications() {
    // список новых постов
    const posts = await this.emailSubscriberRepository.getAll();

    if (posts.length === 0) {
      return 'There are no new posts to send notifications to';
    }

    // список пользователей для рассылки
    const users = await this.userRepository.getAll();

    const promiseArray = [] as Promise<void>[];
    users.forEach((user) => promiseArray.push(this.mailService.sendNotify(user, posts)));

    await Promise.all(promiseArray);

    // очищаем список новых постов
    await this.emailSubscriberRepository.deleteAll();

    return `Sended ${users.length} mails, posts count: ${posts.length}`;
  }
}
