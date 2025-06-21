import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/data-access';
import { Model } from 'mongoose';
import { NotifyPostEntity } from './notify-post.entity';
import { NotifyPostFactory } from './notify-post.factory';
import { NotifyPostModel } from './notify-post.model';

@Injectable()
export class EmailSubscriberRepository extends BaseMongoRepository<NotifyPostEntity, NotifyPostModel> {
  constructor(
    entityFactory: NotifyPostFactory,
    @InjectModel(NotifyPostModel.name) notifyPostModel: Model<NotifyPostModel>,
  ) {
    super(entityFactory, notifyPostModel);
  }

  //   public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
  //     const document = await this.model.findOne({ email }).exec();
  //     return this.createEntityFromDocument(document);
  //   }
}
