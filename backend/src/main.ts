import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant/app';
import { BadRequestFilter } from './http-exception';
import { InternalServerFilter } from './http-exception/internal-server/filter';
import { DefaultExceptionFilter } from './http-exception/default-exception/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(
    new DefaultExceptionFilter(),
    new BadRequestFilter(),
    new InternalServerFilter()
  );

  await app.listen(APP_PORT);
  console.log(`App start with port ${APP_PORT}`)
}
bootstrap();
