import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { PROCESSOR_NOTIFY_ORDER, QUEUE_NOTIFY_ORDER } from "src/constant/queue";
import { SocketGateway } from "src/socket.gateway";

@Processor(PROCESSOR_NOTIFY_ORDER)
@Injectable()
export class ProcessWorkerNotifyOrder {
    constructor(
      private readonly socketGateway: SocketGateway
    ) {}
    
    @Process({
      name: QUEUE_NOTIFY_ORDER,
      concurrency: 1
    })
    async processNotify(job: Job) {
      console.log(job.data);

      this.socketGateway.sendToAllClients('update_product_count', job.data);

      await job.isCompleted();
    }
}
