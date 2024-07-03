import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './common/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: env.TRANSPORT_HOST,
      port: env.TRANSPORT_PORT,
    },
  });

  await app.startAllMicroservices();

  const options = new DocumentBuilder()
    .setTitle('Crypto currency API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000/api');
}

bootstrap();
