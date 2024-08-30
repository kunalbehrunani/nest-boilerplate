import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LogEntity } from './schemas/test/testCollection.schema';

export enum MongoDBConnectionNames {
  TEST = 'test',
}

@Module({})
export class MongoDbModule {
  static forTestDb(): DynamicModule {
    return {
      module: MongoDbModule,
      imports: [
        MongooseModule.forRootAsync({
          connectionName: MongoDBConnectionNames.TEST,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const mongoDbConfig = configService.get('mongodb');
            const {
              username,
              password,
              cluster,
              database: { test },
            } = mongoDbConfig;

            const generalUri = `mongodb+srv://${username}:${password}@${cluster}.luzw7.mongodb.net/${test}`;

            return { uri: generalUri };
          },
        }),
        MongooseModule.forFeature([LogEntity], MongoDBConnectionNames.TEST),
      ],
      exports: [MongooseModule],
    };
  }
}
