import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  console.log('------------Started application on Port : '+ process.env.NODE_PORT)
  await app.listen(+process.env.NODE_PORT);
}
bootstrap();
