import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({
  collection: 'log',
  timestamps: { createdAt: true, updatedAt: true },
  minimize: false,
  versionKey: false,
  strict: false,
})
export class Log {}

export const LogEntity = {
  name: Log.name,
  schema: SchemaFactory.createForClass(Log),
};
