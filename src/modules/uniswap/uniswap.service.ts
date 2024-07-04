import Web3 from 'web3';
import { Injectable } from '@nestjs/common';
import { FACTORY_CONTRACT_ADDRESS } from 'src/common/constans/factory.constans';
import {
  CHECK_ADDRESS,
  PAIRS,
  WEB_3_LINK,
} from 'src/common/constans/web3.constans';
import { getABI } from 'src/common/helper/pancake-factory.helper';

@Injectable()
export class UniswapService {
  private web3: Web3;
  private factoryContract: any;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(WEB_3_LINK));
    this.factoryContract = new this.web3.eth.Contract(
      getABI('IPancakeFactory'),
      FACTORY_CONTRACT_ADDRESS,
    );
  }

  async getRates(): Promise<any> {
    const rates = [];

    for (const pair of PAIRS) {
      try {
        const pairAddress = await this.factoryContract.methods
          .getPair(pair.tokenA, pair.tokenB)
          .call();

        if (pairAddress === CHECK_ADDRESS) {
          console.log(`No pair exists for ${pair.tokenA}/${pair.tokenB}`);
          continue;
        }

        const pairContract = new this.web3.eth.Contract(
          getABI('IPair'),
          pairAddress,
        );

        const reserves: { _reserve0: string; _reserve1: string } =
          await pairContract.methods.getReserves().call();
        const rate =
          parseFloat(reserves._reserve0) / parseFloat(reserves._reserve1);

        rates.push({
          address: `${pair.tokenA}/${pair.tokenB}`,
          rate,
          symbol: pair.symbol,
        });
      } catch (error) {
        console.error(
          `Error fetching rate for pair ${pair.tokenA}/${pair.tokenB}: ${error.message}`,
        );
        if (error.message.includes('out of gas')) {
          console.log(
            'Transaction out of gas. Try increasing gas limit or optimizing contract code.',
          );
        }
      }
    }
    return rates;
  }
}
