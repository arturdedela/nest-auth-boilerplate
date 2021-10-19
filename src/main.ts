import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api/v0');
  app.use(cookieParser());

  app.use((req, res, next) => {
    next();
  });

  const options = new DocumentBuilder().setTitle('Exchange API').setVersion('0.1').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap().catch(console.error);
