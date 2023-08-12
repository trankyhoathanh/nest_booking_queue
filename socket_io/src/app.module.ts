import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotifyGateway } from './notify/notify.gateway';
import { ProcessWorkerNotifyOrder } from './consumer/notify.worker';
import { BullModule } from '@nestjs/bull';
import { PROCESSOR_NOTIFY_IO_ORDER } from './constant/queue';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number.parseInt(process.env.REDIS_PORT) || 8379,
      },
    }),
    BullModule.registerQueue(
      { name: PROCESSOR_NOTIFY_IO_ORDER }
    ),
  ],
  controllers: [AppController],
  providers: [ProcessWorkerNotifyOrder, NotifyGateway],
})
export class AppModule {}
