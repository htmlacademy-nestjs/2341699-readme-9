import { Injectable } from '@nestjs/common';
import { User } from '@project/core';
import { PrismaClientService } from '@project/user-models';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepository {
  entityFactory = new UserFactory();

  constructor(readonly client: PrismaClientService) {}

  public async create(user: UserEntity) {
    const pojoEntity = user.toPOJO();

    const record = await this.client.user.create({
      data: {
        ...pojoEntity,
      },
    });

    user.id = record.id;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.client.user.findUnique({
      where: {
        email,
      },
    });

    return user ? this.createEntity(user) : null;
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await this.client.user.findUnique({
      where: {
        id,
      },
    });

    return user ? this.createEntity(user) : null;
  }

  createEntity(item: User): UserEntity | null {
    return item ? this.entityFactory.create(item as ReturnType<UserEntity['toPOJO']>) : null;
  }
}
