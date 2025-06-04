import { Module } from '@nestjs/common';
import { NotifyConfigModule } from '@project/notify-config';

@Module({
  imports: [NotifyConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
