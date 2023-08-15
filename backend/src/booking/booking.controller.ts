
import { Controller, Post, Request, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingQueue } from './dto/booking.interface';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService,
  ) {}

  @Post()
  async booking(@Body() bookingData: BookingQueue) {
    return await this.bookingService.createBookingToQueue(bookingData);
  }
}
