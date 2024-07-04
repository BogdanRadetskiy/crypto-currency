import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { GetCurrencyDto } from './dto/request/get-currency.dto';
import { GetCurrencyInDateRangeDto } from './dto/request/get-currency-in-date.range.dto';

@ApiTags('currency')
@Controller()
export class CurrencyController {
  private lastRequestTime: number = 0;
  private readonly requestInterval: number = 5000;
  constructor(
    @Inject('crypto_currency') private readonly client: ClientProxy,
    private readonly currencyService: CurrencyService,
  ) {}

  @Get('getRate')
  async getRate(@Query() payload: GetCurrencyDto): Promise<any> {
    try {
      const result = await this.currencyService.getRate(payload);
      return result;
    } catch (error) {
      console.error('Error sending request to microservice:', error);
      throw new Error('Failed to fetch currency rate.');
    }
  }

  @Get('getHistoryRates')
  async getHistoryRates(@Query() payload: GetCurrencyInDateRangeDto) {
    const currentTime = Date.now();
    if (currentTime - this.lastRequestTime < this.requestInterval) {
      return 'Too many requests. Please try again later.';
    }

    this.lastRequestTime = currentTime;

    try {
      const result = await this.currencyService.getHistoryRates(payload);
      return result;
    } catch (error) {
      console.error(`Error processing request: ${error.message}`, error.stack);
      throw new Error(
        'Failed to fetch historical rates. Please try again later.',
      );
    }
  }
}
