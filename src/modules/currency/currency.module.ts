import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { RepositoryModule } from 'src/repository/repositorys.module';
import { UniswapService } from '../uniswap/uniswap.service';

@Module({
  imports: [RepositoryModule],
  providers: [CurrencyService, UniswapService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
