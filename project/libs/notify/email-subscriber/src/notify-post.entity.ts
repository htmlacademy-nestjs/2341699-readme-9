import { Entity, NotifyPost, StorableEntity } from '@project/core';

export class NotifyPostEntity extends Entity implements StorableEntity<NotifyPost> {
  public url: string;
  public description: string;
  public publicationDate: Date;

  constructor(notifyPost?: NotifyPost) {
    super();
    this.populate(notifyPost);
  }

  public populate(notifyPost?: NotifyPost): void {
    if (!notifyPost) {
      return;
    }

    this.id = notifyPost.id ?? '';
    this.url = notifyPost.url;
    this.description = notifyPost.description;
    this.publicationDate = notifyPost.publicationDate;
  }

  public toPOJO(): NotifyPost {
    return {
      id: this.id || undefined,
      url: this.url,
      description: this.description,
      publicationDate: this.publicationDate,
    };
  }
}
