import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PROCESSOR_BOOKING_CREATE, QUEUE_BOOKING_CREATE } from 'src/constant/queue';

@Injectable()
export class BookingService {
  constructor(
    @InjectQueue(PROCESSOR_BOOKING_CREATE) private readonly processerBooking: Queue,
  ) {}

  async createBookingToQueue(orderData: any) {
    try {
      
      this.processerBooking.add(QUEUE_BOOKING_CREATE, orderData);

      return {
        msg: `Booking created`,
        data: orderData
      }
    } catch (error) {
      console.log(error);
    }
  }
}
