import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronTasksService } from './cron.service';
import { CurrencyService } from '../currency/currency.service';
import { UniswapService } from '../uniswap/uniswap.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronTasksService, CurrencyService, UniswapService],
})
export class CronTasksModule {}
