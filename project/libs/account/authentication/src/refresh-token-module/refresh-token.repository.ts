import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtToken } from '@project/core';
import { PrismaClientService } from '@project/user-models';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenRepository {
  entityFactory = new RefreshTokenFactory();

  constructor(readonly client: PrismaClientService) {}

  public async save(entity: RefreshTokenEntity) {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.token.create({
      data: {
        ...pojoEntity,
      },
    });

    entity.id = record.id;
  }

  public async deleteByTokenId(id: string) {
    await this.client.token.delete({
      where: {
        tokenId: id,
      },
    });
  }

  public async findByTokenId(id: string): Promise<RefreshTokenEntity | null> {
    const token = await this.client.token.findFirst({
      where: {
        tokenId: id,
      },
    });

    if (!token) {
      throw new NotFoundException(`Token with id ${id} not found.`);
    }

    return this.createEntity(token);
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.client.token.deleteMany({
      where: {
        expiresIn: {
          lt: new Date(),
        },
      },
    });
  }

  createEntity(item: JwtToken): RefreshTokenEntity | null {
    return item ? this.entityFactory.create(item as ReturnType<RefreshTokenEntity['toPOJO']>) : null;
  }
}
