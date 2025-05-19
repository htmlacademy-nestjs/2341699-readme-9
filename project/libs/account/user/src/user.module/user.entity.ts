import { AuthUser, Entity, StorableEntity } from '@project/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public firstname: string;
  public lastname: string;
  public avatar?: string;
  public createdAt: Date;
  public publicationsCount: number;
  public subscribersCount: number;
  public subscribers?: string[];
  public subscriptions?: string[];
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.subscribers = user.subscribers;
    this.subscriptions = user.subscriptions;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      avatar: this.avatar,
      createdAt: this.createdAt,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
      subscribers: this.subscribers,
      subscriptions: this.subscriptions,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
