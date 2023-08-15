import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/http-exception';
import { TypeMessage } from 'src/http-exception/types';

@Injectable()
export class CommonErrorHandlerMiddleware {
  checkError(err: any) {
    if (err.details) {
      const errors = err.details.map((detail: any) => ({ err: detail.message }));
      throw new BadRequestException(TypeMessage.BAD_INPUT, errors);
    }
    throw new BadRequestException("Exception", err);
  }
}
