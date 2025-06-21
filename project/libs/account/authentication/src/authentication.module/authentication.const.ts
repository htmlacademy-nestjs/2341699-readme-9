export const AuthServiceException = {
  USER_NOT_FOUND: 'User not found',
  USER_PASSWORD_WRONG: 'User password is wrong',
};

export const AuthApiResponseDescription = {
  LOGGED_SUCCESS: 'User has been successfully logged.',
  LOGGED_ERROR: 'Password or Login is wrong.',
  REFRESH_TOKEN: 'Get a new access/refresh tokens',
};

export const AuthenticationProperty = {
  Id: {
    Description: {
      description: 'User ID',
      example: '2c5ea4c0-4067-11ec-9e99-8f0b7c0f93d1',
    },
  },
  Email: {
    Description: {
      description: 'User email',
      example: 'user@example.ru',
    },
    Validate: { Message: 'The email is not valid' },
  },
  Password: {
    Description: {
      description: 'User password',
      example: 'Qwerty',
    },
    Validate: {
      MinLength: 6,
      MaxLength: 12,
      Message: 'The password is not valid. Lengths must be between 6 and 12 characters',
    },
  },
  Name: {
    Description: {
      description: 'User name',
      example: 'Ivan Ivanov',
    },
    Validate: {
      MinLength: 3,
      MaxLength: 50,
      Message: 'The name is not valid. Lengths must be between 3 and 50 characters.',
    },
  },
  Avatar: {
    Description: {
      type: 'string',
      description: 'User avatar',
      example: '/images/avatar/5.jpg',
      format: 'binary',
      required: false,
    },
    Validate: {
      FileExtRegExp: /\.(jpg|jpeg|png)$/,
      MaxSize: 500 * 1024,
      Message: 'It is allowed to upload a jpg or png image (size <= 500 Kb)',
    },
  },
  OldPassword: {
    Description: {
      description: 'Current user password',
      example: '123456',
    },
  },
  AccessToken: {
    Description: {
      description: 'User access token',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzk0N2ZjMzQ0NDRmYWM2MmE4MDVmYjgiLCJlbWFpbCI6IkFJQG5tYWlsLnJ1IiwibmFtZSI6IkFsZXhleSBJdmFub3YiLCJpYXQiOjE3Mzc4OTQ2MTIsImV4cCI6MTczNzg5NDkxMn0.oU8NF3Rsub-Y-77FNhmcsg1mhkRoneSSl5wO6siUy6g',
    },
  },
  RefreshToken: {
    Description: {
      description: 'User refresh token',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzk0N2ZjMzQ0NDRmYWM2MmE4MDVmYjgiLCJlbWFpbCI6IkFJQG5tYWlsLnJ1IiwibmFtZSI6IkFsZXhleSBJdmFub3YiLCJ0b2tlbklkIjoiZjQ4ZmI4MjUtYjhiMy00MjMyLWI3NDUtYmNmNjcyMmY4MWYyIiwiaWF0IjoxNzM3ODk0NTYzLCJleHAiOjE3NDA0ODY1NjN9.EnQNpCY0UBWRblDb9DXfN5q-VDTQHOt8_xrHLihQyfk',
    },
  },
  RegisterDate: {
    Description: {
      description: 'User register date (ISO format)',
      example: '2024-10-31T11:54:13.605Z',
    },
  },
  PostCount: {
    Description: {
      description: 'Count of user posts',
      example: '123',
    },
  },
  SubscriberCount: {
    Description: {
      description: 'Count of subscribers',
      example: '12',
    },
  },
} as const;
