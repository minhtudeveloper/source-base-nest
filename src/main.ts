import { validationConfig } from '@/configs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './bases/filters/exception.filter';
import { ResponseInterceptor } from './bases/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);
  app.enableCors();
  const env = appConfig.get('nodeENV');
  const port = appConfig.get<number>('port', 3000);

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    Logger.log(
      `Nest application listening on port ${port}`,
      env?.toUpperCase(),
    );
  });
}
bootstrap();
