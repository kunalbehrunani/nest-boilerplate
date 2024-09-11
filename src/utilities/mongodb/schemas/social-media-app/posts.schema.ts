import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema({
  collection: 'posts',
  timestamps: { createdAt: true, updatedAt: true },
  minimize: false,
  versionKey: false,
  strict: true,
})
export class Posts {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  body: string;
}

export const PostsEntity = {
  name: Posts.name,
  schema: SchemaFactory.createForClass(Posts),
};
