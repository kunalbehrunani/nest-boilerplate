import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import * as moment from 'moment';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(param: {
    name: string;
    handle: string;
    dob: Date;
    password: string;
  }): Promise<{ userId: string }> {
    const userId = `${Math.floor(Math.random() * 100000)}`;
    await this.appRepository.createUser({
      userId,
      name: param.name,
      handle: param.handle,
      dob: param.dob,
      password: param.password,
    });
    return { userId };
  }

  async createPost(param: {
    userId: string;
    title: string;
    body: string;
  }): Promise<{ postId: string }> {
    const postId = `${param.userId}_${moment.utc().format('X')}`;

    await this.appRepository.createPost({
      postId,
      userId: param.userId,
      title: param.title,
      body: param.body,
    });

    return {
      postId,
    };
  }

  async createFollow(param: {
    followerUserId: string;
    followingUserId: string;
  }): Promise<void> {
    await this.appRepository.createFollow({ ...param });
  }
}
