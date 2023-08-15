import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  get booking() {
    return this.prisma.booking;
  }

  get booking_queue() {
    return this.prisma.booking_queue;
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
