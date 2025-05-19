import { Module } from '@nestjs/common';
import { NotifyConfigModule } from '@project/notify-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NotifyConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
