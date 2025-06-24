export const AuthServiceException = {
  USER_NOT_FOUND: 'User not found',
  USER_PASSWORD_WRONG: 'User password is wrong',
  USER_EXIST: 'User with the email already exists',
};

export const AuthApiResponseDescription = {
  LOGGED_SUCCESS: 'User has been successfully logged',
  LOGGED_ERROR: 'Password or Login is wrong',
  REFRESH_TOKEN: 'Get a new access/refresh tokens',
  USER_FOUND: 'User found',
  USER_NOT_FOUND: 'User not found',
  USER_EXIST: 'User with the email already exists',
  USER_CREATED: 'The new user has been successfully created.',
};

export const UserValidatorOptions = {
  USER_NAME_MIN_LENGTH: 3,
  USER_NAME_MAX_LENGTH: 50,
  USER_PASSWORD_MIN_LENGTH: 6,
  USER_PASSWORD_MAX_LENGTH: 12,
};
