import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class PostLikeRepository {
  constructor(readonly client: PrismaClientService) {}

  public async addPostLike(postId: string, userId: string) {
    const existCount = await this.client.postLike.count({
      where: {
        postId,
        userId,
      },
    });

    if (existCount > 0) return;

    await this.client.postLike.create({
      data: {
        postId,
        userId,
      },
    });

    await this.refreshPostLikeCount(postId);
  }

  public async deletePostLike(postId: string, userId: string) {
    const existPostLike = await this.client.postLike.findFirstOrThrow({
      where: {
        postId,
        userId,
      },
    });

    await this.client.postLike.delete({
      where: {
        id: existPostLike.id,
      },
    });

    await this.refreshPostLikeCount(postId);
  }

  async refreshPostLikeCount(postId: string) {
    const likeCount = await this.client.postLike.count({
      where: {
        postId,
      },
    });

    await this.client.post.update({
      where: { id: postId },
      data: {
        likeCount,
      },
    });
  }
}
