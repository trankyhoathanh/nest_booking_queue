import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(APP_PORT);
  console.log(`App start with port ${APP_PORT}`)
}
bootstrap();
