import { Entity, Post, PostStatus, PostType, StorableEntity } from '@project/core';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public type: PostType;
  public status: PostStatus;

  public publicationDate: Date;
  public createdAt: Date;

  public tags?: string[];
  public userId: string;

  public isRepost: boolean;
  public repostId?: string;
  public repostUserId?: string;

  public viewCount: number;
  public likeCount: number;
  public commentCount: number;
  public repostCount: number;

  // видео
  public videoTitle?: string;
  public videoUrl?: string;

  // текст
  public textTitle?: string;
  public textAnnouncement?: string;
  public text?: string;

  // цитата
  public quoteText?: string;
  public quoteAuthor?: string;

  // фото
  public photoId?: string;

  // ссылка
  public linkUrl?: string;
  public linkDescription?: string;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) return;

    this.id = post.id ?? '';

    this.type = post.type;
    this.status = post.status;

    this.publicationDate = post.publicationDate;
    this.createdAt = post.createdAt;

    this.tags = post.tags;
    this.userId = post.userId;

    this.isRepost = post.isRepost;
    this.repostId = post.repostId;
    this.repostUserId = post.repostUserId;

    this.commentCount = post.commentCount;
    this.likeCount = post.likeCount;
    this.viewCount = post.viewCount;
    this.repostCount = post.repostCount;

    this.videoTitle = post.videoTitle;
    this.videoUrl = post.videoUrl;

    this.text = post.text;
    this.textTitle = post.textTitle;
    this.textAnnouncement = post.textAnnouncement;

    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;

    this.photoId = post.photoId;

    this.linkUrl = post.linkUrl;
    this.linkDescription = post.linkDescription;
  }

  toPOJO(): Post {
    return {
      id: this.id || undefined,
      type: this.type,
      status: this.status,

      publicationDate: this.publicationDate,
      createdAt: this.createdAt,

      tags: this.tags,
      userId: this.userId,

      isRepost: this.isRepost,
      repostId: this.repostId,
      repostUserId: this.repostUserId,

      commentCount: this.commentCount,
      likeCount: this.likeCount,
      viewCount: this.viewCount,
      repostCount: this.repostCount,

      videoTitle: this.videoTitle,
      videoUrl: this.videoUrl,

      text: this.text,
      textTitle: this.textTitle,
      textAnnouncement: this.textAnnouncement,

      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,

      photoId: this.photoId,

      linkUrl: this.linkUrl,
      linkDescription: this.linkDescription,
    } as Post;
  }
}
