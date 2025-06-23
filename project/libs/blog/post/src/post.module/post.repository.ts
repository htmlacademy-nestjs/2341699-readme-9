import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { PaginationResult, Post, PostCount, PostStatus, SortDirection } from '@project/core';
import { DEFAULT_SEARCH_POST_COUNT_LIMIT } from './post.const';
import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { BlogPostQuery } from './post.query';
import { Prisma } from '.prisma/blog-client';

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

  public async getByQuery(query: BlogPostQuery) {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tag) {
      where.tags = {
        hasSome: [query.tag],
      };
    }

    if (query?.postType) {
      where.type = query.postType;
    }

    if (query?.isDraft) {
      where.userId = query?.userId ?? '-';
      where.status = PostStatus.Draft;
    } else {
      if (query?.userId) {
        where.userId = query.userId;
      }
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getPostCount(where),
    ]);

    return {
      items: records.map((record) => this.createEntity(record as Post)?.toPOJO()),
      currentPage: query?.page,
      totalPages: Math.ceil(postCount / take),
      itemsPerPage: take,
      totalItems: postCount,
    } as PaginationResult<Post>;
  }

  public async search(query: string) {
    const take = DEFAULT_SEARCH_POST_COUNT_LIMIT;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    orderBy.createdAt = SortDirection.Desc;

    where.status = PostStatus.Published;

    where.OR = [
      {
        videoTitle: { contains: query, mode: 'insensitive' },
      },
      {
        textTitle: { contains: query, mode: 'insensitive' },
      },
    ];

    return await this.client.post.findMany({
      where,
      orderBy,
      skip: 0,
      take,
    });
  }

  public async getPostCountByUserId(userId: string) {
    const where: Prisma.PostWhereInput = {
      userId,
    };

    const postCount = await this.getPostCount(where);

    return {
      userId,
      postCount,
    } as PostCount;
  }

  private createEntity(item: Post): PostEntity | null {
    return item ? this.entityFactory.create(item as ReturnType<PostEntity['toPOJO']>) : null;
  }

  private async getPostCount(where: Prisma.PostWhereInput) {
    return this.client.post.count({ where });
  }
}
