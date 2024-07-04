import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from './common/config/env.config';

async function bootstrap() {
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        host: env.TRANSPORT_HOST,
        port: env.TRANSPORT_PORT,
      },
    });

  await microservice.listen();
  console.log(
    `Microservice is running on: ${env.TRANSPORT_HOST}:${env.TRANSPORT_PORT}`,
  );

  // const app = await NestFactory.create(AppModule);
  // await app.listen(env.HTTP_PORT);
  // console.log(`HTTP server is running on port: ${env.HTTP_PORT}`);
}

bootstrap();
