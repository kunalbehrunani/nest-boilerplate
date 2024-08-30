import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Utilities } from './utilities/utilities.module';

@Module({
  imports: [Utilities],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
