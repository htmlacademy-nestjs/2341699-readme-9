import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostCommentDto } from './dto/post-comment.dto';
import { PostCommentFactory } from './post-comment.factory';
import { PostCommentRepository } from './post-comment.repository';

@Injectable()
export class PostCommentService {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly postCommentFactory: PostCommentFactory,
  ) {}

  public async create(dto: PostCommentDto, userId: string) {
    const entity = this.postCommentFactory.createFromDto(dto, userId);

    await this.postCommentRepository.create(entity);

    // обновление кол-ва комментариев в записи публикации
    await this.postCommentRepository.refreshPostCommentCount(entity.postId);

    return entity;
  }

  public async delete(id: string, userId: string) {
    const existComment = await this.postCommentRepository.findById(id);

    if (existComment.userId !== userId) throw new UnauthorizedException('No access');

    await this.postCommentRepository.delete(id);

    // обновление кол-ва комментариев в записи публикации
    await this.postCommentRepository.refreshPostCommentCount(existComment.postId);
  }

  public async getByPostId(postId: string) {
    return await this.postCommentRepository.getByPostId(postId);
  }
}
