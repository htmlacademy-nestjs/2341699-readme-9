import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@project/core';
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
  ) {}

  public async getAllPosts(query: BlogPostQuery) {
    return await this.postRepository.getByQuery(query);
  }

  public async search(query: string) {
    return await this.postRepository.search(query);
  }

  public async create(dto: PostDto, userId: string) {
    const newPost = this.postFactory.createPostFromDto(dto, userId);

    const postEntity = new PostEntity(newPost);

    await this.postRepository.create(postEntity);

    return postEntity.toPOJO();
  }

  public async update(id: string, dto: PostDto, userId: string) {
    const existPost = await this.getById(id);

    if (!existPost) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    if (existPost.userId !== userId) throw new ConflictException(PostServiceException.POST_ACCESS_ERROR);

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

    // todo: delete comments
  }

  public async getById(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    // todo: create RDO
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

    this.postLikeRepository.addPostLike(id, userId);
  }

  public async deleteLike(id: string, userId: string) {
    const post = await this.postRepository.findById(id);

    if (!post) throw new NotFoundException(PostServiceException.POST_NOT_FOUND);

    this.postLikeRepository.deletePostLike(id, userId);
  }
}
