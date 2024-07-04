import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { RepositoryModule } from 'src/repository/repositorys.module';
import { UniswapService } from '../uniswap/uniswap.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'src/common/config/env.config';

@Module({
  imports: [
    RepositoryModule,
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
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, UniswapService],
})
export class CurrencyModule {}
