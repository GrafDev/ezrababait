import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS with multiple origins
    const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:3001',
        'http://localhost:3002'
    ].filter(Boolean); // Remove any undefined values

    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    // Global exception filter
    app.useGlobalFilters(new AllExceptionsFilter());

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle('Good Deeds API')
        .setDescription('The Good Deeds API description')
        .setVersion('1.0')
        .addTag('good-deeds')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Global API prefix
    app.setGlobalPrefix('api');

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
