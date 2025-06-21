import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { NotifyConfig } from '@project/notify-config';
import { UserEntity } from '@project/user';
import { NotifyPostEntity } from '../notify-post.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>;

  public async sendNotify(user: UserEntity, posts: NotifyPostEntity[]) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: user.email,
      subject: 'New posts notifications',
      template: './new-post-notifications',
      context: {
        user: `${user.firstname} ${user.lastname}`,
        posts,
      },
    });
  }
}
