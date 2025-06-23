import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
  urls: {
    auth: string;
    user: string;
    posts: string;
    postComment: string;
    fileVault: string;
    notify: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  urls: {
    auth: Joi.string().uri().required(),
    user: Joi.string().uri().required(),
    posts: Joi.string().uri().required(),
    postComment: Joi.string().uri().required(),
    fileVault: Joi.string().uri().required(),
    notify: Joi.string().uri().required(),
  },
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notifications Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env['NODE_ENV'] as Environment,
    port: parseInt(process.env['API_PORT'] || `${DEFAULT_PORT}`),
    urls: {
      auth: process.env['AUTH_URL'] ?? '',
      user: process.env['USER_URL'] ?? '',
      posts: process.env['POSTS_URL'] ?? '',
      postComment: process.env['POST_COMMENT_URL'] ?? '',
      fileVault: process.env['FILE_VAULT_URL'] ?? '',
      notify: process.env['NOTIFY_URL'] ?? '',
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
