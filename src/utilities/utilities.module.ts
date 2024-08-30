import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
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
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class Utilities {}
