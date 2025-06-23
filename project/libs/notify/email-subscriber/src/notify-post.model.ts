import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotifyPost } from '@project/core';
import { Document } from 'mongoose';

@Schema({
  collection: 'notify-posts',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class NotifyPostModel extends Document implements NotifyPost {
  @Prop({
    required: true,
  })
  public url: string;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
  })
  public publicationDate: Date;

  public override id?: string;
}

export const NotifyPostSchema = SchemaFactory.createForClass(NotifyPostModel);

NotifyPostSchema.virtual('id').get(function () {
  return this._id.toString();
});
