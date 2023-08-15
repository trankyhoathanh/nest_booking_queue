import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Booking, BookingQueue } from './dto/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async updateBookingQueue(bookingQueue: BookingQueue) {
    try {
      const bookingUpdated = await this.prisma.booking_queue.update(
        {
          where: {
            id: bookingQueue.id
          },
          data: {
            executed: true
          }
        });
  
      return bookingUpdated;
    } catch (err) {
      console.log(err);
    }
  }
  
  async createBooking(booking: Booking) {
    const bookingCreated = await this.prisma.booking.create(
      {
        data: booking
      });

    return bookingCreated;
  }
}
