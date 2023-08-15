import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
