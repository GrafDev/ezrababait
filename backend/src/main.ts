import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ... (rest of the configuration remains the same)

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // ... (rest of the setup remains the same)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error('Exception caught:', exception);

    if (exception instanceof Error) {
      console.error('Stack trace:', exception.stack);
    }

    let errorMessage = 'Internal server error';
    if (exception instanceof HttpException) {
      errorMessage = exception.message;
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }

    response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: errorMessage,
          stack: process.env.NODE_ENV === 'production' ? undefined : (exception instanceof Error ? exception.stack : undefined),
        });
  }
}
