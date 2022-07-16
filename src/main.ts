import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // filter request obj with predefined dto props exclude non-dto props
      forbidNonWhitelisted: true, // optional stop request with non-dto props
      transform: true, // transform controller args to instance dto class/ primitive type
      transformOptions: {
        // If set to true class-transformer will attempt conversion based on TS reflected type
        enableImplicitConversion: false,
      },
    }),
  );
  const port = process.env.PORT || 4000;
  await app.listen(port, () => {
    logger.log(`App listening on port ${port}`);
  });
}

bootstrap();
