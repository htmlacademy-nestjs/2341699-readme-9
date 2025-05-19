export const PostValidatorOptions = {
  POST_TAGS_ARRAY_MAX_SIZE: 8,
  POST_TAGS_MIN_LENGTH: 3,
  POST_TAGS_MAX_LENGTH: 10,
  POST_VIDEO_TITLE_MIN_LENGHT: 20,
  POST_VIDEO_TITLE_MAX_LENGHT: 50,
  POST_TEXT_TITLE_MIN_LENGHT: 20,
  POST_TEXT_TITLE_MAX_LENGHT: 50,
  POST_TEXT_ANNOUNCEMENT_MIN_LENGHT: 50,
  POST_TEXT_ANNOUNCEMENT_MAX_LENGHT: 255,
  POST_TEXT_MIN_LENGHT: 100,
  POST_TEXT_MAX_LENGHT: 1024,
  POST_QUOTE_TEXT_MIN_LENGTH: 20,
  POST_QUOTE_TEXT_MAX_LENGTH: 300,
  POST_QUOTE_AUTHOR_MIN_LENGTH: 3,
  POST_QUOTE_AUTHOR_MAX_LENGTH: 50,
  POST_LINK_DESCRIPTION_MAX_LENGTH: 300,
};

export const PostServiceException = {
  POST_NOT_FOUND: 'Post not found',
  POST_ACCESS_ERROR: "Уou don't have access",
};

export const TEST_USER_ID = 'test-id';

export const PostApiResponseDescription = {
  POST_FOUND: 'Publication found',
  POST_NOT_FOUND: 'Publication not found',
  POST_CREATED: 'The new publication has been successfully created',
  POST_UPDATED: 'The publication has been successfully updated',
  POST_DELETED: 'The publication has been successfully deleted',
  POST_REPOSTED: 'The publication has been successfully reposted',
  POST_LIKE_ADDED: 'The like publication has been successfully added',
  POST_LIKE_DELETED: 'The like publication has been successfully deleted',
};
