import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { PROCESSOR_BOOKING_CREATE, PROCESSOR_NOTIFY_IO_ORDER, PROCESSOR_NOTIFY_ORDER } from './constant/queue';
import { ProcessWorkerBookingCreate } from './consumer/booking.worker';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number.parseInt(process.env.REDIS_PORT) || 8379,
      },
    }),
    BullModule.registerQueue(
      { name: PROCESSOR_BOOKING_CREATE },
      { name: PROCESSOR_NOTIFY_ORDER },
      { name: PROCESSOR_NOTIFY_IO_ORDER }
    ),
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService, ProcessWorkerBookingCreate],
})
export class AppModule {}
