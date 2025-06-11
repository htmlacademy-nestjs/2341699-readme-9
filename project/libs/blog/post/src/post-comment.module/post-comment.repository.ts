import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { PaginationResult, PostComment, SortDirection } from '@project/core';
import { PostCommentEntity } from './post-comment.entity';
import { PostCommentQuery } from './post-comment.query';
import { Prisma } from '.prisma/blog-client';

@Injectable()
export class PostCommentRepository {
  constructor(readonly client: PrismaClientService) {}

  public async create(entity: PostCommentEntity) {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.postComment.create({
      data: {
        ...pojoEntity,
      },
    });

    entity.id = record.id;
  }

  public async delete(id: string) {
    await this.client.postComment.delete({
      where: {
        id,
      },
    });
  }

  public async getByPostId(postId: string) {
    return (await this.client.postComment.findMany({
      where: {
        postId,
      },
    })) as PostComment[];
  }

  public async getByQuery(query: PostCommentQuery) {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostCommentWhereInput = {};
    const orderBy: Prisma.PostCommentOrderByWithRelationInput = {};

    // сортируем по дате добавления коммента от новых к старым
    orderBy.createdAt = SortDirection.Desc;

    where.postId = query.postId;

    const [records, postCount] = await Promise.all([
      this.client.postComment.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getPostCommentCount(where),
    ]);

    return {
      entities: records.map((record) => record as PostComment),
      currentPage: query?.page,
      totalPages: Math.ceil(postCount / take),
      itemsPerPage: take,
      totalItems: postCount,
    } as PaginationResult<PostComment>;
  }

  public async findById(id: string) {
    const item = await this.client.postComment.findUnique({
      where: {
        id,
      },
    });

    if (!item) throw new NotFoundException(`Post comment with id = '${id}' not found.`);

    return item;
  }

  public async refreshPostCommentCount(postId: string) {
    const commentCount = await this.client.postComment.count({
      where: {
        postId,
      },
    });

    await this.client.post.update({
      where: { id: postId },
      data: {
        commentCount,
      },
    });
  }

  private async getPostCommentCount(where: Prisma.PostCommentWhereInput) {
    return this.client.postComment.count({ where });
  }
}
