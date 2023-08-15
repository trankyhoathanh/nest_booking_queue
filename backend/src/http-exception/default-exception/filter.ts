import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { TypeError } from "../types";

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.errorCode !== undefined) {
      response.status(exception.status).json({
        statusCode: exception.status,
        errorCode: exception.errorCode,
        message: exception.message,
      });
    } else {
      response.status(500).json({
        statusCode: TypeError.INTERNAL_SERVER,
        message: exception.name || exception.message,
      });
    }
  }
}