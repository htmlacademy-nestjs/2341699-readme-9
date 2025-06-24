import { Injectable } from '@nestjs/common';
import { User } from '@project/core';
import { PrismaClientService } from '@project/user-models';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepository {
  entityFactory = new UserFactory();

  constructor(readonly client: PrismaClientService) {}

  public async update(user: UserEntity) {
    const record = await this.client.user.update({
      where: { id: user.id },
      data: {
        passwordHash: user.passwordHash,
        publicationsCount: user.publicationsCount,
        subscribersCount: user.subscribersCount,
      },
    });

    return this.createEntity(record);
  }

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

  public async getAll() {
    return (await this.client.user.findMany()).map((e) => this.createEntity(e)).filter((e) => e !== null);
  }

  public async addSubsriber(userId: string, subscriberId: string) {
    const existItem = await this.getSubscriber(userId, subscriberId);

    // запись уже существует, выходим
    if (existItem) return;

    await this.client.userSubscriber.create({
      data: {
        userId,
        subscriberId,
      },
    });

    // обновляем кол-во подписчиков у пользователя на которого подписались
    await this.refreshSubscribersCount(userId);
  }

  public async deleteSubsriber(userId: string, subscriberId: string) {
    const existItem = await this.getSubscriber(userId, subscriberId);

    // записи нет, выходим
    if (!existItem) return;

    await this.client.userSubscriber.delete({
      where: {
        id: existItem.id,
      },
    });

    // обновляем кол-во подписчиков у пользователя от которого отписались
    await this.refreshSubscribersCount(userId);
  }

  private async getSubscriber(userId: string, subscriberId: string) {
    return await this.client.userSubscriber.findFirst({
      where: {
        userId,
        subscriberId,
      },
    });
  }

  private async refreshSubscribersCount(userId: string) {
    const subscribersCount = await this.client.userSubscriber.count({
      where: {
        userId,
      },
    });

    await this.client.user.update({
      where: { id: userId },
      data: {
        subscribersCount,
      },
    });
  }

  private createEntity(item: User): UserEntity | null {
    return item ? this.entityFactory.create(item as ReturnType<UserEntity['toPOJO']>) : null;
  }
}
