import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PROCESSOR_BOOKING_CREATE, QUEUE_BOOKING_CREATE } from 'src/constant/queue';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingQueue } from './dto/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectQueue(PROCESSOR_BOOKING_CREATE) private readonly processerBooking: Queue,
    private readonly prisma: PrismaService
  ) {}

  async createBookingToQueue(bookingData: BookingQueue) {
    // Save DB
    const bookingCreated = await this.prisma.booking_queue.create({ data: bookingData });

    // Add to Queue Consumer
    this.processerBooking.add(QUEUE_BOOKING_CREATE, bookingCreated);

    return {
      msg: `Booking created`,
      data: bookingCreated
    }
  }
}
