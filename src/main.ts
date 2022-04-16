import { NestFactory } from '@nestjs/core';
import { ReadModule } from './read/read.module';

async function bootstrap() {
  const app = await NestFactory.create(ReadModule);
  await app.listen(3000);
}
bootstrap();
