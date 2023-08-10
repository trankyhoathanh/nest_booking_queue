import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BookingService } from './booking.service';
import { PROCESSOR_BOOKING_CREATE } from 'src/constant/queue';

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
      { name: PROCESSOR_BOOKING_CREATE }
    ),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
  ],
  exports: [BookingService],
})
export class BookingModule {}
