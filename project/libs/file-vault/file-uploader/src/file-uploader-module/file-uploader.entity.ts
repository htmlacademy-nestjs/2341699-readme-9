import { Entity, File, StorableEntity } from '@project/core';

export class FileUploaderEntity extends Entity implements StorableEntity<File> {
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt: Date;
  public subDirectory: string;

  constructor(file?: File) {
    super();
    this.populate(file);
  }

  public populate(file?: File): void {
    if (!file) {
      return;
    }

    this.id = file.id ?? '';
    this.originalName = file.originalName;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
    this.createdAt = file.createdAt;
    this.subDirectory = file.subDirectory;
  }

  public toPOJO(): File {
    return {
      id: this.id || undefined,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      subDirectory: this.subDirectory,
    };
  }
}
