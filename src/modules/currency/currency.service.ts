import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from 'src/repository/repositorys/currency.repository';
import { PRICE_LINK } from 'src/common/constans/binance.constans';
import { PAIRS } from 'src/common/constans/pairs.constans';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DATE } from 'src/common/constans/date.constans';
import { CreateCurrencyDto } from './dto/request/create-currency.dto';
import { ASSETS } from 'src/common/constans/assets.constans';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetCurrencyDto } from './dto/request/get-currency.dto';
import { GetCurrencyInDateRangeDto } from './dto/request/get-currency-in-date.range.dto';
import { UniswapService } from '../uniswap/uniswap.service';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly currencyRepository: CurrencyRepository,
    private readonly uniswapService: UniswapService,
  ) {}

  @MessagePattern({ cmd: 'get_rate_binance' })
  async getRate(pairs: GetCurrencyDto): Promise<CreateCurrencyDto | string> {
    const keys = await this.redis.keys('*');

    const cachedData = await Promise.all(
      keys.map(async (key) => {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
      }),
    );

    const foundCurrency = cachedData.find((currency: any) => {
      return (
          currency &&
          currency.symbolA === pairs.symbolA &&
          currency.symbolB === pairs.symbolB &&
          currency.isCorrect === true
      );
  });

    if (foundCurrency) {
      return foundCurrency;
    }

    return 'The requested currency pair is not found in the cache.';
  }

  async saveCurrencyRate(): Promise<void> {
    const [binancePrices, uniswapRates] = await Promise.all([
        this.getPricesInBinance(),
        this.uniswapService.getRates()
    ]);

    const currencyPromises = binancePrices.map(async (price) => {
        const matchingUniswapRate = uniswapRates.find(rate => rate.symbol === price.symbol);

        if (matchingUniswapRate) {
            const binanceRate = parseFloat(price.price);
            const uniswapRate = matchingUniswapRate.rate;

            const rateDifference = Math.abs(binanceRate - uniswapRate);
            const percentageDifference = (rateDifference / uniswapRate) * 100;

            let isCorrect = percentageDifference <= 10;

            const currency: CreateCurrencyDto = {
                symbolA: price.baseAsset,
                symbolB: price.quoteAsset,
                pair: price.symbol,
                timestamp: DATE,
                pairAddressUni: matchingUniswapRate.address,
                rate: binanceRate,
                isCorrect: isCorrect,
            };

            await this.currencyRepository.save(currency);

            const cacheKey = `currency:${price.symbol}`;
            await this.redis.set(cacheKey, JSON.stringify(currency), 'EX', 80);

            return currency;
        }
    });

    await Promise.all(currencyPromises);
}

  async getPairsFromDbInTimeRange(
    dateRange: GetCurrencyInDateRangeDto,
  ): Promise<any> {
    return await this.currencyRepository.getPair(dateRange);
  }

  async getPricesInBinance() {
    try {
      const fetchPrice = async (pair: string) => {
        try {
          const response = await axios.get(`${PRICE_LINK}${pair}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching price for pair ${pair}:`, error);
          return null;
        }
      };

      const responses = await Promise.all(PAIRS.map(fetchPrice));

      return responses
        .filter((data) => data !== null)
        .map(({ symbol, price }) => {
          const baseAsset =
            ASSETS.find((asset) => symbol.startsWith(asset)) || '';
          const quoteAsset =
            ASSETS.find(
              (asset) => symbol.endsWith(asset) && asset !== baseAsset,
            ) || '';

          return {
            symbol,
            price,
            baseAsset,
            quoteAsset,
          };
        });
    } catch (error) {
      console.error('Error fetching prices:', error);
      throw error;
    }
  }

  //FOR GET ACTUAL LIST PAIRS ON BINANCE
  async checPairsListInBinance() {
    try {
      const response = await axios.get(
        'https://api.binance.com/api/v3/exchangeInfo',
      );
      const symbols = response.data.symbols.map((symbol) => symbol.symbol);
      console.log('Available symbols:', symbols);
      return symbols;
    } catch (error) {
      console.error('Error fetching exchange info:', error);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron(): Promise<void> {
    console.log('Running cron job...');
    await this.saveCurrencyRate();
  }
}
