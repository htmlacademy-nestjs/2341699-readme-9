export const SALT_ROUNDS = 10;

export const UserApiResponseDescription = {
  USER_FOUND: 'User found',
  USER_NOT_FOUND: 'User not found',
  USER_EXIST: 'User with the email already exists',
  USER_CREATED: 'The new user has been successfully created.',
};

export const UserServiceException = {
  USER_EXISTS: 'User with this email exists',
  USER_NOT_FOUND: 'User not found',
};

export const UserValidatorOptions = {
  USER_NAME_MIN_LENGTH: 3,
  USER_NAME_MAX_LENGTH: 50,
  USER_PASSWORD_MIN_LENGTH: 6,
  USER_PASSWORD_MAX_LENGTH: 12,
};
