import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private _client: Redis;

  constructor(private readonly configService: ConfigService) {
    const redisConfig = this.configService.get('redis');

    if (redisConfig.connect) {
      this._client = new Redis({
        host: redisConfig.host,
        port: redisConfig.port,
        retryStrategy: function (times) {
          if (times >= 1) {
            throw new BadGatewayException(
              '[SYSTEM ERROR] | REDIS | Unable to connect to Redis',
              {
                cause:
                  'Please ensure redis server - ' + this._host + ' is active',
                description:
                  'Unable to establish connection to redis server: ' +
                  this._host,
              },
            );
          }
          return 0;
        },
      });
    }
  }

  get client() {
    return this._client;
  }
}
