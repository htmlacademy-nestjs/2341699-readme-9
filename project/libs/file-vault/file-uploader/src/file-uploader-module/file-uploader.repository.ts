import { Injectable } from '@nestjs/common';
import { File } from '@project/core';
import { PrismaClientService } from '@project/file-vault-models';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

@Injectable()
export class FileUploaderRepository {
  entityFactory = new FileUploaderFactory();

  constructor(readonly client: PrismaClientService) {}

  public async save(entity: FileUploaderEntity) {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.file.create({
      data: {
        ...pojoEntity,
      },
    });

    entity.id = record.id;
  }

  public async findById(id: string) {
    const item = await this.client.file.findUnique({
      where: {
        id,
      },
    });

    return this.createEntity(item);
  }

  private createEntity(item: File | null): FileUploaderEntity | null {
    return item ? this.entityFactory.create(item as ReturnType<FileUploaderEntity['toPOJO']>) : null;
  }
}
