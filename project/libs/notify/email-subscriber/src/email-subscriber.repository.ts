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

  public async getAll() {
    return (await this.model.find().exec()).map((e) => this.createEntityFromDocument(e)).filter((e) => e !== null);
  }

  public async deleteAll() {
    await this.model.deleteMany().exec();
  }
}
