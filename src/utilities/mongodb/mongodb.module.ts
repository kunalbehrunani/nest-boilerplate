import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowsEntity } from './schemas/social-media-app/follows.schema';
import { PostsEntity } from './schemas/social-media-app/posts.schema';
import { UsersEntity } from './schemas/social-media-app/users.schema';
import { LogEntity } from './schemas/test/testCollection.schema';

export enum MongoDBConnectionNames {
  TEST = 'test',
  SOCIAL_MEDIA_APP = 'social-media-app',
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

  static forSocialMediaAppDb(): DynamicModule {
    return {
      module: MongoDbModule,
      imports: [
        MongooseModule.forRootAsync({
          connectionName: MongoDBConnectionNames.SOCIAL_MEDIA_APP,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const mongoDbConfig = configService.get('mongodb');
            const {
              username,
              password,
              cluster,
              database: { socialMediaApp },
            } = mongoDbConfig;

            const generalUri = `mongodb+srv://${username}:${password}@${cluster}.luzw7.mongodb.net/${socialMediaApp}`;

            return { uri: generalUri };
          },
        }),
        MongooseModule.forFeature(
          [UsersEntity, PostsEntity, FollowsEntity],
          MongoDBConnectionNames.SOCIAL_MEDIA_APP,
        ),
      ],
      exports: [MongooseModule],
    };
  }
}
