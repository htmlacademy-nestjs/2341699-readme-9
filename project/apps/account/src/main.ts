import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDocumentBuilder, GLOBAL_PREFIX } from './app/app.const';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(configDocumentBuilder.Title)
    .setDescription(configDocumentBuilder.Description)
    .setVersion(configDocumentBuilder.Version)
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
