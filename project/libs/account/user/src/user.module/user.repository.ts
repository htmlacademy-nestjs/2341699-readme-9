import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepository extends BaseMemoryRepository<UserEntity> {
  constructor(entityFactory: UserFactory) {
    super(entityFactory);
  }

  public findByEmail(email: string): Promise<UserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return Promise.resolve(user ? this.entityFactory.create(user) : null);
  }
}
