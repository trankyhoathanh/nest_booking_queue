
import { Controller, Post, Request, Body } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService,
  ) {}

  @Post()
  async booking(@Request() req, @Body() bookingData: any) {
    return await this.bookingService.createBookingToQueue(bookingData);
  }
}
