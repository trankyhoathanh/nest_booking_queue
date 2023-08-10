import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { BullModule } from '@nestjs/bull';
import { PROCESSOR_NOTIFY_ORDER } from './constant/queue';
import { ProcessWorkerNotifyOrder } from './consumer/notify.worker';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number.parseInt(process.env.REDIS_PORT) || 8379,
      },
    }),
    BullModule.registerQueue(
      { name: PROCESSOR_NOTIFY_ORDER }
    ),
  ],
  providers: [SocketGateway, ProcessWorkerNotifyOrder]
})
export class AppModule {}
