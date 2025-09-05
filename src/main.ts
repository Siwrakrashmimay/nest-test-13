import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const cfg = new DocumentBuilder()
    .setTitle('Simple Encrypt API')
    .setDescription('Endpoints: /get-encrypt-data, /get-decrypt-data')
    .setVersion('1.0.0')
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('api-docs', app, doc);

  await app.listen(3000);
  console.log('http://localhost:3000/api-docs');
}
bootstrap();
