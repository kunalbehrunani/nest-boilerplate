import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { MongoDBConnectionNames } from './utilities/mongodb/mongodb.module';
import {
  FollowsDocument,
  FollowsEntity,
} from './utilities/mongodb/schemas/social-media-app/follows.schema';
import {
  PostsDocument,
  PostsEntity,
} from './utilities/mongodb/schemas/social-media-app/posts.schema';
import {
  UsersDocument,
  UsersEntity,
} from './utilities/mongodb/schemas/social-media-app/users.schema';
import {
  LogDocument,
  LogEntity,
} from './utilities/mongodb/schemas/test/testCollection.schema';

@Injectable()
export class AppRepository {
  constructor(
    @InjectModel(LogEntity.name, MongoDBConnectionNames.TEST)
    private logCollection: Model<LogDocument>,

    @InjectModel(UsersEntity.name, MongoDBConnectionNames.SOCIAL_MEDIA_APP)
    private usersCollection: Model<UsersDocument>,

    @InjectModel(PostsEntity.name, MongoDBConnectionNames.SOCIAL_MEDIA_APP)
    private postsCollection: Model<PostsDocument>,

    @InjectModel(FollowsEntity.name, MongoDBConnectionNames.SOCIAL_MEDIA_APP)
    private followsCollection: Model<FollowsDocument>,
  ) {}

  async createUser(param: {
    userId: string;
    name: string;
    handle: string;
    dob: Date;
    password: string;
  }): Promise<void> {
    await this.usersCollection.create({ ...param });
  }

  async createPost(param: {
    postId: string;
    userId: string;
    title: string;
    body: string;
  }): Promise<void> {
    await this.postsCollection.create({ ...param });
  }

  async createFollow(param: {
    followerUserId: string;
    followingUserId: string;
  }): Promise<void> {
    await this.followsCollection.create({
      follower: param.followerUserId,
      following: param.followingUserId,
    });
  }
}
