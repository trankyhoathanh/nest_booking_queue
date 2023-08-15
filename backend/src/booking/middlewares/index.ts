import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { bookingValidator } from '../validator/booking';
import { CommonErrorHandlerMiddleware } from 'src/common/common-error-handler.middleware';
import { BadRequestException } from 'src/http-exception';

@Injectable()
export class CheckBookingMiddleware implements NestMiddleware {
    constructor(
        private errorHandler: CommonErrorHandlerMiddleware
    ){}

    ///////////////////////////
    //
    // Detail Options
    // 
    // abortEarly
    // --- true : Throw first invalid if existed
    // --- false: Throw all invalid if existed
    //
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            await bookingValidator.validateAsync(req.body, { abortEarly: false })
            next()
        } catch (error) {
            this.errorHandler.checkError(error);
        }
    }
}
