import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { MongoDBConnectionNames } from './utilities/mongodb/mongodb.module';
import {
  LogDocument,
  LogEntity,
} from './utilities/mongodb/schemas/test/testCollection.schema';

@Injectable()
export class AppRepository {
  constructor(
    @InjectModel(LogEntity.name, MongoDBConnectionNames.TEST)
    private logCollection: Model<LogDocument>,
  ) {
    this.logCollection.insertMany([
      {
        message: 'hello world',
      },
    ]);
  }
}
