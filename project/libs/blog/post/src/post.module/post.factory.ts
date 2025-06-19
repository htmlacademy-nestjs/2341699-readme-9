import { Injectable } from '@nestjs/common';
import { EntityFactory, Post, PostStatus, PostType } from '@project/core';
import { PostDto } from './dto/post-dto.type';
import { PostLinkDto } from './dto/post-link.dto';
import { PostPhotoDto } from './dto/post-photo.dto';
import { PostQuoteDto } from './dto/post-quote.dto';
import { PostTextDto } from './dto/post-text.dto';
import { PostVideoDto } from './dto/post-video.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(entityPlainData: Post): PostEntity {
    return new PostEntity(entityPlainData);
  }

  public createPostFromDto(dto: PostDto, userId: string) {
    const post: Post = {
      userId,
      type: dto.type,
      status: PostStatus.Published,

      publicationDate: new Date(),
      createdAt: new Date(),

      isRepost: false,

      commentCount: 0,
      likeCount: 0,
      viewCount: 0,
      repostCount: 0,
    };

    // заполнение объекта данными
    this.fillDataFromDto(post, dto);

    return post;
  }

  public updatePostFromDto(post: Post, dto: PostDto) {
    this.fillDataFromDto(post, dto);

    if (dto.publicationDate) post.publicationDate = dto.publicationDate;

    post.status = dto.status;
  }

  private fillDataFromDto(post: Post, dto: PostDto) {
    switch (post.type) {
      case PostType.Video:
        this.fillVideo(post, dto as PostVideoDto);
        break;
      case PostType.Text:
        this.fillText(post, dto as PostTextDto);
        break;
      case PostType.Quote:
        this.fillQuote(post, dto as PostQuoteDto);
        break;
      case PostType.Photo:
        this.fillPhoto(post, dto as PostPhotoDto);
        break;
      case PostType.Link:
        this.fillLink(post, dto as PostLinkDto);
        break;
    }

    this.fillTags(post, dto);
  }

  private fillVideo(post: Post, dto: PostVideoDto) {
    post.videoTitle = dto.videoTitle;
    post.videoUrl = dto.videoUrl;
  }

  private fillText(post: Post, dto: PostTextDto) {
    post.text = dto.text;
    post.textAnnouncement = dto.textAnnouncement;
    post.textTitle = dto.textTitle;
  }

  private fillQuote(post: Post, dto: PostQuoteDto) {
    post.quoteText = dto.quoteText;
    post.quoteAuthor = dto.quoteAuthor;
  }

  private fillPhoto(post: Post, dto: PostPhotoDto) {
    post.photoId = dto.photoId;
  }

  private fillLink(post: Post, dto: PostLinkDto) {
    post.linkUrl = dto.linkUrl;
    post.linkDescription = dto.linkDescription;
  }

  private fillTags(post: Post, dto: PostDto) {
    post.tags = [];

    if (!dto.tags) return;

    // уникальные значения в верхнем регистре, отсортированные
    post.tags = [...new Set(dto.tags)].map((e) => e.toUpperCase()).sort();
  }
}
