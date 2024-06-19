import { Internal } from '@/helpers/message.sytem';
import { APIResponse } from '../interceptors/response.interceptor';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private static handleResponse(
    response: Response,
    exception: HttpException | QueryFailedError | Error,
  ): void {
    const responseBody: APIResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Internal.SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      responseBody.statusCode = HttpStatus.BAD_REQUEST;
      responseBody.message = exception.message;
      response.status(responseBody.statusCode).json(responseBody);
    } else if (exception instanceof Error) {
      responseBody.message = exception.stack ?? Internal.SERVER_ERROR;
      response.status(responseBody.statusCode).json(responseBody);
    }
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    // Handling error message and logging
    this.handleMessage(exception);

    // Response to client
    AppExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error,
  ): void {
    let message = Internal.SERVER_ERROR;

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack?.toString() ?? Internal.SERVER_ERROR;
    } else if (exception instanceof Error) {
      message = exception.stack?.toString() ?? Internal.SERVER_ERROR;
    }

    Logger.error(message, Internal.APP_EXCEPTION);
  }
}
