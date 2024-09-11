import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FollowsDocument = Follows & Document;

@Schema({
  collection: 'follows',
  timestamps: { createdAt: true, updatedAt: true },
  minimize: false,
  versionKey: false,
  strict: true,
})
export class Follows {
  @Prop()
  follower: string;

  @Prop()
  following: string;
}

export const FollowsEntity = {
  name: Follows.name,
  schema: SchemaFactory.createForClass(Follows),
};
