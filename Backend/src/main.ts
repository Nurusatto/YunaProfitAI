import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import  cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)

  app.use(cookieParser())
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  
  app.enableCors({
    credentials: true,
    origin: config.getOrThrow('CLIENT')
  });
  await app.listen(config.getOrThrow('PORT') ?? 3000);
}
bootstrap();
