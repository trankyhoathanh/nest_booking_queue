import { HttpException, HttpStatus } from "@nestjs/common";
import { TypeError } from '../types';

export class BadRequestException extends HttpException {
    constructor(message?: string, details?: any, errorCode?: any) {
      super(
        {
          message,
          type: TypeError.BAD_REQUESTED,
          details,
          errorCode
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }