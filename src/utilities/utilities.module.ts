import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { MongoDbModule } from './mongodb/mongodb.module';
import { RedisService } from './Redis/redis.service';
import { HttpModule } from '@nestjs/axios';

const defaultConfig = () => {
  const path = `./config/default.json`;
  const data = fs.readFileSync(path, { encoding: 'utf-8' });
  return data ? JSON.parse(data) : {};
};

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      timeoutErrorMessage: 'Request Timeout',
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      cache: false,
      load: [defaultConfig],
    }),
    MongoDbModule.forTestDb(),
    MongoDbModule.forSocialMediaAppDb(),
  ],
  providers: [RedisService, AuthGuard, AuthService],
  exports: [
    AuthGuard,
    AuthService,
    HttpModule,
    RedisService,
    MongoDbModule.forTestDb(),
    MongoDbModule.forSocialMediaAppDb(),
  ],
})
export class Utilities {}
