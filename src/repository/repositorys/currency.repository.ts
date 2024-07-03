import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from 'src/modules/currency/dto/request/create-currency.dto';
import { GetCurrencyInDateRangeDto } from 'src/modules/currency/dto/request/get-currency-in-date.range.dto';
import { Currency } from 'src/modules/currency/entity/currency.entity';

@Injectable()
export class CurrencyRepository {
  constructor(
    @InjectModel(Currency.name)
    private currencyModel: Model<Currency>,
  ) {}

  async save(pair: CreateCurrencyDto): Promise<Currency> {
    const newCurrency = new this.currencyModel(pair);
    return newCurrency.save();
  }

  async getPair(dateRange: GetCurrencyInDateRangeDto): Promise<Currency[]> {
    const { dateStart, dateEnd } = dateRange;
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    const pairs = await this.currencyModel
      .find({
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
        symbolA: dateRange.symbolA,
        symbolB: dateRange.symbolB,
        isCorrect: true,
      })
      .exec();

    return pairs;
  }
}
