import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import { CACHE_BOOKING_KEY } from "src/constant/cache";
import { PROCESSOR_BOOKING_CREATE, PROCESSOR_NOTIFY_ORDER, QUEUE_BOOKING_CREATE, QUEUE_NOTIFY_ORDER } from "src/constant/queue";
import { RedisService } from "src/redis/redis.service";

@Processor(PROCESSOR_BOOKING_CREATE)
@Injectable()
export class ProcessWorkerBookingCreate {
    constructor(
      private readonly redisService: RedisService,
      @InjectQueue(PROCESSOR_NOTIFY_ORDER) private readonly processerNotifyOrder: Queue
    ) {}
    
    @Process({
      name: QUEUE_BOOKING_CREATE,
      concurrency: 1
    })
    async processBooking(job: Job) {
      let bookingCount = 1;

      // Get new booking number, send to notify Client Worker
      // const cachedBookingCountNotify = await this.redisService.getValue(CACHE_BOOKING_KEY);
      // console.log(`Booking current : ${cachedBookingCountNotify}`);

      // Add queue send to Socket Notify Client
      
      await this.delay(this.between(1000, 2000));
      console.log(job.data);

      const cachedBooking = await this.redisService.getValue(CACHE_BOOKING_KEY);
      if (cachedBooking) {
        bookingCount = Number.parseInt(cachedBooking) + 1;
      }

      await this.redisService.setValue(CACHE_BOOKING_KEY, bookingCount)

      this.processerNotifyOrder.add(QUEUE_NOTIFY_ORDER, `Booking current : ${bookingCount}`);
      
      await job.isCompleted();
    }

    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    private between(min: number, max: number) {  
      return Math.floor(
        Math.random() * (max - min) + min
      )
    }
}
