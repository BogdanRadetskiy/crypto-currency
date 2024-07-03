import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyRepository } from './repositorys/currency.repository';
import {
  Currency,
  CurrencySchema,
} from 'src/modules/currency/entity/currency.entity';

const providers = [CurrencyRepository];

const models = [{ name: Currency.name, schema: CurrencySchema }];

@Global()
@Module({
  imports: [MongooseModule.forFeature([...models])],
  controllers: [],
  providers,
  exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}
