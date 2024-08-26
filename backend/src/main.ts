import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupSwagger } from './shared/swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  SetupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  await app.listen(+process.env.NODE_PORT);
  console.info('* * * * * * * * * * * * Started application on Port : '+ process.env.NODE_PORT + " * * * * * * * * * * * * * * * ")
}
bootstrap();
