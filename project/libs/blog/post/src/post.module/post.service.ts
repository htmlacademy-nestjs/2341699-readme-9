import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogNotifyService } from '@project/blog-notify';
import { Post, PostStatus, PostType } from '@project/core';
import { Request } from 'express';
import { PostLikeRepository } from '../post-like.module/post-like.repository';
import { PostDto } from './dto/post-dto.type';
import { PostServiceException } from './post.const';
import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { BlogPostQuery } from './post.query';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
    private readonly postLikeRepository: PostLikeRepository,
    private readonly blogNotifyService: BlogNotifyService,
  ) {}

  public async getAllPosts(query: BlogPostQuery) {
    return await this.postRepository.getByQuery(query);
  }

  public async search(query: string) {
    return await this.postRepository.search(query);
  }

  public async create(dto: PostDto, req: Request) {
    const newPost = this.postFactory.createPostFromDto(dto);

    const postEntity = new PostEntity(newPost);

    await this.postRepository.create(postEntity);

    if (postEntity.status === PostStatus.Published) {
      await this.blogNotifyService.createPost({
        url: this.getPostUrl(postEntity.id, req),
        description: this.getPostDescription(postEntity),
        publicationDate: postEntity.publicationDate,
      });
    }

    return postEntity.toPOJO();
  }

  public async update(id: string, dto: PostDto) {
    const existPost = await this.getById(id);

    if (!existPost) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    if (existPost.userId !== dto.userId) throw new ConflictException(PostServiceException.POST_ACCESS_ERROR);

    this.postFactory.updatePostFromDto(existPost, dto);

    const postEntity = new PostEntity(existPost);

    await this.postRepository.update(postEntity);

    return postEntity.toPOJO();
  }

  public async delete(id: string, userId: string) {
    const existPost = await this.getById(id);

    if (!existPost) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    if (existPost.userId !== userId) throw new ConflictException(PostServiceException.POST_ACCESS_ERROR);

    await this.postRepository.deleteById(id);

    // если это был репост, пересчитываем кол-во репостов у оригинальной публикации
    if (existPost.repostId) await this.postRepository.refreshRepostCount(existPost.repostId);
  }

  public async getById(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    return post.toPOJO();
  }

  public async repost(id: string, userId: string) {
    const originalPost = await this.postRepository.findById(id);

    if (!originalPost) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    const repost = { ...originalPost.toPOJO() } as Post;

    repost.id = '';
    repost.userId = userId;
    repost.repostId = originalPost.id;
    repost.repostUserId = originalPost.userId;
    repost.isRepost = true;
    repost.createdAt = new Date();

    const repostEntity = new PostEntity(repost);

    await this.postRepository.create(repostEntity);

    // обновляем кол-во репостов у оригинальной публикации
    await this.postRepository.refreshRepostCount(originalPost.id);

    return repostEntity.toPOJO();
  }

  public async addLike(id: string, userId: string) {
    const post = await this.postRepository.findById(id);

    if (!post) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    await this.postLikeRepository.addPostLike(id, userId);
  }

  public async deleteLike(id: string, userId: string) {
    const post = await this.postRepository.findById(id);

    if (!post) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    await this.postLikeRepository.deletePostLike(id, userId);
  }

  public async getPostCountByUserId(userId: string) {
    return await this.postRepository.getPostCountByUserId(userId);
  }

  private getPostDescription(post: PostEntity) {
    switch (post.type) {
      case PostType.Video:
        return `New video post: ${post.videoTitle}`;
      case PostType.Text:
        return `New text post: ${post.textTitle}`;
      case PostType.Quote:
        return 'New quote post';
      case PostType.Photo:
        return 'New photo post';
      case PostType.Link:
        return 'New link post';
      default:
        return 'New post';
    }
  }

  private getPostUrl(postId: string, req: Request) {
    return `${req.protocol}://${req.get('Host')}/api/post/${postId}`;
  }
}
