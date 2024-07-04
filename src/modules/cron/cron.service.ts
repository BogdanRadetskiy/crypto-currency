import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class CronTasksService {
  constructor(private readonly currencyService: CurrencyService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron(): Promise<void> {
    console.log('Running cron job...');
    await this.currencyService.saveCurrencyRate();
  }
}
