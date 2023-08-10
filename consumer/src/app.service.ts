import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healhCheck(): string {
    return 'Health check ok !';
  }
}
