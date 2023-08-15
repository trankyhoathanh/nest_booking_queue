import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import { BookingService } from "src/booking/booking.service";
import { CACHE_BOOKING_KEY } from "src/constant/cache";
import {
  PROCESSOR_BOOKING_CREATE,
  PROCESSOR_NOTIFY_IO_ORDER,
  PROCESSOR_NOTIFY_ORDER,
  QUEUE_BOOKING_CREATE,
  QUEUE_NOTIFY_IO_ORDER,
  QUEUE_NOTIFY_ORDER
} from "src/constant/queue";
import { RedisService } from "src/redis/redis.service";

@Processor(PROCESSOR_BOOKING_CREATE)
@Injectable()
export class ProcessWorkerBookingCreate {
  constructor(
    private readonly redisService: RedisService,
    private readonly bookingService: BookingService,
    @InjectQueue(PROCESSOR_NOTIFY_ORDER) private readonly processerNotifyOrder: Queue,
    @InjectQueue(PROCESSOR_NOTIFY_IO_ORDER) private readonly processerNotifyIOOrder: Queue
  ) {}
  
  @Process({
    name: QUEUE_BOOKING_CREATE,
    concurrency: 1
  })
  async processBooking(job: Job) {
    let bookingCount = 1;

    //////////////////////////////////////////////////
    // Execute One Booking 
    // With DB (SQL, NoSQL)
    //
    
    // Update Booking Queue
    const bookingQueueUpdated = await this.bookingService.updateBookingQueue(job.data);

    // Create Booking
    const booking = { ...bookingQueueUpdated };
    await this.bookingService.createBooking(booking);

    // Show log
    console.log(`Updated / Saved --- ${ booking.id }`);

    //////////////////////////////////////////////////
    // Update caching count
    //
    const cachedBooking = await this.redisService.getValue(CACHE_BOOKING_KEY);
    if (cachedBooking) {
      bookingCount = Number.parseInt(cachedBooking) + 1;
    }
    await this.redisService.setValue(CACHE_BOOKING_KEY, bookingCount)

    //////////////////////////////////////////////////
    // Add to queue notify
    // WebSocket Queue : processerNotifyOrder
    // Socket IO Queue : processerNotifyIOOrder
    //
    this.processerNotifyOrder.add(QUEUE_NOTIFY_ORDER, `Booking current : ${bookingCount}`);
    this.processerNotifyIOOrder.add(QUEUE_NOTIFY_IO_ORDER, `Booking current : ${bookingCount}`);
    
    //////////////////////////////////////////////////
    // Job Complete FIFO
    //
    await job.isCompleted();
  }
}
