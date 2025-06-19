import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { PostComment } from '@project/core';
import { PostCommentEntity } from './post-comment.entity';

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
}
