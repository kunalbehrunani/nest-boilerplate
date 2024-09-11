import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './utilities/auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('data')
  async getData(): Promise<{ message: string }> {
    return {
      message: 'Hello World!',
    };
  }

  @Post('user')
  async createUser(@Body() body: any): Promise<{ userId: string }> {
    return this.appService.createUser({
      name: body.name,
      handle: body.handle,
      dob: body.dob,
      password: body.password,
    });
  }

  @Post('post')
  async createPost(@Body() body: any): Promise<{ postId: string }> {
    return this.appService.createPost({
      userId: body.userId,
      title: body.title,
      body: body.body,
    });
  }

  // @Post('follow')
  // async createFollow(@Body()): Promise<void> {}
}
