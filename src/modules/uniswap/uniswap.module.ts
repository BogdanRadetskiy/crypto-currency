import { Module } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Module({
  providers: [UniswapService],
  controllers: [],
})
export class UniswapModule {}
