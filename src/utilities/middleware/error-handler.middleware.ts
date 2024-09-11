import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let exceptionData: any = exception.getResponse();
    const exceptionPath: any = exception.stack.split('\n').slice(1).join('');
    const status: number = exception.getStatus();

    if (status < 400) {
      response.status(status).json(exceptionData);
      return;
    }

    if (exceptionData && typeof exceptionData === 'string') {
      if (status >= 500) {
        exceptionData = {
          userMessage: 'Internal Server Error',
          developerMessage: exceptionData,
        };
      } else {
        exceptionData = {
          userMessage: exceptionData,
          developerMessage: 'Bad Request',
        };
      }
    }

    /*
     * Handling Errors Thrown by Validation Pipe (Nest JS).
     * Format:  { statusCode: 400, message: [ 'message 1', 'message 2' ], error: 'Bad Request' }
     */
    if (
      exceptionData &&
      typeof exceptionData === 'object' &&
      exceptionData.message &&
      exceptionData.statusCode &&
      !exceptionData.userMessage &&
      !exceptionData.developerMessage
    ) {
      exceptionData.userMessage = 'Something Went Wrong';
      if (typeof exceptionData.message === 'string') {
        exceptionData.developerMessage = exceptionData.message;
      } else if (Array.isArray(exceptionData.message)) {
        exceptionData.developerMessage = exceptionData.message.join(', ');
      } else {
        exceptionData.developerMessage = 'Something Went Unexpectedly Wrong';
      }
    }

    const errorObject = {
      userMessage:
        typeof exceptionData === 'object' && exceptionData?.userMessage
          ? exceptionData.userMessage
          : 'Something Went Wrong',
      developerMessage:
        typeof exceptionData === 'object' && exceptionData?.developerMessage
          ? exceptionData.developerMessage
          : 'Something Went Wrong',
    };

    request['error'] = {
      userMessage: errorObject.userMessage,
      developerMessage: errorObject.developerMessage,
      statusCode: status || 500,
      path: exceptionPath,
    };

    response.status(status).json(/* exceptionData */ errorObject);
  }
}
