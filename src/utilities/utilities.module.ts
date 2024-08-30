import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import { MongoDbModule } from './mongodb/mongodb.module';
import { RedisService } from './Redis/redis.service';

const defaultConfig = () => {
  const path = `./config/default.json`;
  const data = fs.readFileSync(path, { encoding: 'utf-8' });
  return data ? JSON.parse(data) : {};
};

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      cache: false,
      load: [defaultConfig],
    }),
    MongoDbModule.forTestDb(),
  ],
  providers: [RedisService],
  exports: [RedisService, MongoDbModule.forTestDb()],
})
export class Utilities {}
