import { Controller, Get, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { GetCurrencyDto } from './dto/request/get-currency.dto';
import { GetCurrencyInDateRangeDto } from './dto/request/get-currency-in-date.range.dto';

@ApiTags('currency')
@Controller()
export class CurrencyController {
  private client: ClientProxy;
  private lastRequestTime: number = 0;
  private readonly requestInterval: number = 5000;
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('getRate')
  @ApiOperation({ summary: 'Get rate binance' })
  @ApiResponse({
    status: 200,
    description: 'Returns the rate for the specified currency pair.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getRate(@Query() pairs: GetCurrencyDto): Promise<GetCurrencyDto | string> {
    console.log(pairs);
    const pattern = { cmd: 'getRate' };
    const payload = pairs;
    return this.client.send(pattern, payload).toPromise();
  }

  @Get('/get_history_rates')
  @MessagePattern({ cmd: 'get_history_rates' })
  @ApiOperation({ summary: 'Get history rate' })
  @ApiResponse({
    status: 201,
    description: 'The rate has been successfully get.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getPair(@Query() dateRange: GetCurrencyInDateRangeDto) {
    const currentTime = Date.now();
    if (currentTime - this.lastRequestTime < this.requestInterval) {
      console.log('Too many requests. Please try again later.');
    }

    this.lastRequestTime = currentTime;

    return await this.currencyService.getPairsFromDbInTimeRange(dateRange);
  }
}
