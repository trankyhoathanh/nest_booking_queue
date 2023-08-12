import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { PROCESSOR_NOTIFY_IO_ORDER, QUEUE_NOTIFY_IO_ORDER } from "src/constant/queue";
import { NotifyGateway } from "src/notify/notify.gateway";

@Processor(PROCESSOR_NOTIFY_IO_ORDER)
@Injectable()
export class ProcessWorkerNotifyOrder {
    constructor(
      private notifyGateway: NotifyGateway
    ) {}
    
    @Process({
      name: QUEUE_NOTIFY_IO_ORDER,
      concurrency: 1
    })
    async processNotify(job: Job) {
      console.log(job.data);

      this.notifyGateway.sendToAllClients(job.data)

      await job.isCompleted();
    }
}
