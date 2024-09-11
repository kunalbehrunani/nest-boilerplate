import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({
  collection: 'users',
  timestamps: { createdAt: true, updatedAt: true },
  minimize: false,
  versionKey: false,
  strict: true,
})
export class Users {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  handle: string;

  @Prop()
  dob: Date;

  @Prop()
  password: string;
}

export const UsersEntity = {
  name: Users.name,
  schema: SchemaFactory.createForClass(Users),
};
