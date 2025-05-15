export interface PostComment {
  id?: string;

  createdAt: Date;

  userId: string;

  // Идентификатор публикации (обязательно). Публикация, для которой создаётся комментарий.
  postId: string;

  // Текст комментария (обязательно). Минимальная длина: 10 символов, максимальная: 300.
  commentText: string;
}
