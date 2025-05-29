import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
     origin: [
    'http://localhost:4200',
    'http://127.0.0.1:5501',
    'http://127.0.0.1:5501/index.html',
    'https://ingangeljaimes.wixsite.com/my-site'
  ],
  });
  await app.listen(3000);
}
bootstrap();
