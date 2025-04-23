import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { HeadersInterceptor } from './common/interceptors/headers.interceptor';

async function bootstrap() {
  const port: string = process.env.PORT || '3000';
  const pathSwagger: string = '';
  const globalPrefix: string = 'api/v1';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new HeadersInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      validateCustomDecorators: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TLI Test Dev')
    .setDescription('This is a document of TLI test dev webservice')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  SwaggerModule.setup(pathSwagger, app, document, {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    customSiteTitle: 'TLI Test Dev API Documentation',
  });

  await app.listen(port);

  Logger.log(
    ` 📚 Swagger document on: http://localhost:${port}/${pathSwagger}`,
  );
  Logger.log(
    ` 🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
