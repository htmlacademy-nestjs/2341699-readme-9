import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;

  type: PostType;
  status: PostStatus;

  publicationDate: Date;
  createdAt: Date;

  // Название публикации (обязательно). Минимальная длина 20 символов, максимальная 50.
  videoTitle?: string;
  // Ссылка на видео (обязательно). Валидная ссылка на страницу с видео на сервисе YouTube. Способ проверки валидности ссылки остаётся на усмотрение студента.
  videoUrl?: string;

  // Название публикации (обязательно). Минимальная длина 20 символов, максимальная 50.
  textTitle?: string;
  // Анонс публикации (обязательно). Текст с анонсом публикации. Минимальная длина 50 символов, максимальная 255.
  textAnnouncement?: string;
  // Текст публикации (обязательно). Минимальная длина 100 символов, максимальная 1024 символа.
  text?: string;

  // Текст цитаты (обязательно). Минимальная длина 20 символов, максимальная 300
  quoteText?: string;
  // Автор цитаты (обязательно). Минимальная длина 3 символа, максимальная 50.
  quoteAuthor?: string;

  // Фотография (обязательно). Максимальный размер фотографии: 1 мегабайт. Допускаются форматы: jpg, png.
  // будем получать из file-vault
  photoId?: string;

  // Ссылка (обязательно). Валидный URL.
  linkUrl?: string;
  // Описание (опционально). Описание ссылки. Максимальный размер 300 символов.
  linkDescription?: string;

  tags?: string[];
  userId: string;

  isRepost: boolean;
  repostId?: string;
  repostUserId?: string;

  viewCount: number;
  likeCount: number;
  commentCount: number;
  repostCount: number;
}
