import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CurrencyModule } from './modules/currency/currency.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UniswapModule } from './modules/uniswap/uniswap.module';
import { env } from './common/config/env.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'crypto currency',
        transport: Transport.TCP,
        options: {
          host: env.TRANSPORT_HOST,
          port: env.TRANSPORT_PORT,
        },
      },
    ]),
    RedisModule.forRoot({
      type: 'single',
      url: env.REDIS_HOST,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(env.URL),
    CurrencyModule,
    UniswapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
