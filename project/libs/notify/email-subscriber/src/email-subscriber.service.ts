import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { NotifyPostEntity } from './notify-post.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(private readonly emailSubscriberRepository: EmailSubscriberRepository) {}

  public async addPost(post: CreatePostDto) {
    const notifyPostEntity = new NotifyPostEntity(post);
    await this.emailSubscriberRepository.save(notifyPostEntity);

    return notifyPostEntity;
  }
}
