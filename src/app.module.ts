import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CurrencyModule } from './modules/currency/currency.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UniswapModule } from './modules/uniswap/uniswap.module';
import { env } from './common/config/env.config';
import { CurrencyController } from './modules/currency/currency.controller';
import { CurrencyService } from './modules/currency/currency.service';
import { UniswapService } from './modules/uniswap/uniswap.service';
import { CronTasksModule } from './modules/cron/cron.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'crypto_currency',
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
    CronTasksModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, UniswapService],
})
export class AppModule {}
