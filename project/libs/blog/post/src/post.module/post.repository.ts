import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { Post } from '@project/core';
import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';

@Injectable()
export class PostRepository {
  entityFactory = new PostFactory();

  constructor(readonly client: PrismaClientService) {}

  public async create(entity: PostEntity) {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
      },
    });

    entity.id = record.id;
  }

  public async update(entity: PostEntity) {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.update({
      where: { id: entity.id },
      data: {
        type: pojoEntity.type,
        status: pojoEntity.status,
        publicationDate: pojoEntity.publicationDate,

        videoTitle: pojoEntity.videoTitle,
        videoUrl: pojoEntity.videoUrl,

        textTitle: pojoEntity.textTitle,
        textAnnouncement: pojoEntity.textAnnouncement,
        text: pojoEntity.text,

        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,

        photoId: pojoEntity.photoId,

        linkUrl: pojoEntity.linkUrl,
        linkDescription: pojoEntity.linkDescription,

        tags: pojoEntity.tags,
      },
    });

    return this.createEntity(record as Post);
  }

  public async findById(id: string): Promise<PostEntity | null> {
    const item = await this.client.post.findUnique({
      where: {
        id,
      },
    });

    if (!item) throw new NotFoundException(`Post with id = '${id}' not found.`);

    await this.increaseViewCount(item as Post);

    return this.createEntity(item as Post);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async refreshRepostCount(id: string) {
    const repostCount = await this.client.post.count({
      where: {
        repostId: id,
      },
    });

    await this.client.post.update({
      where: { id },
      data: {
        repostCount,
      },
    });
  }

  public async increaseViewCount(post: Post) {
    await this.client.post.update({
      where: { id: post.id },
      data: {
        viewCount: ++post.viewCount,
      },
    });
  }

  createEntity(item: Post): PostEntity | null {
    return item ? this.entityFactory.create(item as ReturnType<PostEntity['toPOJO']>) : null;
  }
}
