import { Injectable } from '@nestjs/common';
import { EntityFactory, NotifyPost } from '@project/core';
import { NotifyPostEntity } from './notify-post.entity';

@Injectable()
export class NotifyPostFactory implements EntityFactory<NotifyPostEntity> {
  public create(entityPlainData: NotifyPost): NotifyPostEntity {
    return new NotifyPostEntity(entityPlainData);
  }
}
