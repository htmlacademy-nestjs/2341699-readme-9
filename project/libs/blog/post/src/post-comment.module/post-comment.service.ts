import { Injectable } from '@nestjs/common';
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
    throw new Error('Not implemented');
  }

  public async delete(id: string, userId: string) {
    throw new Error('Not implemented');
  }

  public async getByPostId(postId: string) {
    throw new Error('Not implemented');
  }
}
