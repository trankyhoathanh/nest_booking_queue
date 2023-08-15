import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BookingService } from './booking.service';
import { PROCESSOR_BOOKING_CREATE } from 'src/constant/queue';
import { CommonErrorHandlerMiddleware } from 'src/common/common-error-handler.middleware';
import { CheckBookingMiddleware } from './middlewares';
import { PrismaService } from 'src/prisma/prisma.service';

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
    CommonErrorHandlerMiddleware,
    PrismaService,
    BookingService,
  ],
  exports: [BookingService],
})

export class BookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckBookingMiddleware).forRoutes('/');
  }
}
