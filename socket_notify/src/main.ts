import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws'
import { APP_PORT } from './constant/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(APP_PORT);
  console.log(`App start with port ${APP_PORT}`)
}
bootstrap();
