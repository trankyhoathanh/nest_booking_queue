import { Module } from '@nestjs/common';
import { NotifyGateway } from './notify.gateway';
@Module({
  exports: [NotifyGateway],
})
export class NotifyModule {}