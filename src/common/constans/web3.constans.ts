import Web3 from 'web3';
const web3Instance = new Web3(
  new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'),
);

export const WEB_3_LINK = 'https://bsc-dataseed.binance.org/';

export const CHECK_ADDRESS = '0x0000000000000000000000000000000000000000';

export const PAIRS = [
  {
    tokenA: web3Instance.utils.toChecksumAddress(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    ),
    tokenB: web3Instance.utils.toChecksumAddress(
      '0x7130d2a12b9bcBFAe4f2634d864A1Ee1CE3Ead9c'
    ),
    symbol: 'BNBBTC'
  },
  {
    tokenA: web3Instance.utils.toChecksumAddress(
      '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
    ),
    tokenB: web3Instance.utils.toChecksumAddress(
      '0x7130d2a12b9bcBFAe4f2634d864A1Ee1CE3Ead9c'
    ),
    symbol: 'ETHBTC'
  },
  {
    tokenA: web3Instance.utils.toChecksumAddress(
      '0x7ddee176f665cd201f93eede625770e2fd911990'
    ),
    tokenB: web3Instance.utils.toChecksumAddress(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    ),
    symbol: 'GALABNB'
  },
  {
    tokenA: web3Instance.utils.toChecksumAddress(
      '0xba2ae424d960c26247dd6c32edc70b295c744c43'
    ),
    tokenB: web3Instance.utils.toChecksumAddress(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    ),
    symbol: 'DOGEBNB'
  },
  {
    tokenA: web3Instance.utils.toChecksumAddress(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    ),
    tokenB: web3Instance.utils.toChecksumAddress(
      '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
    ),
    symbol: 'BNBETH'
  },
  {
    tokenA: web3Instance.utils.toChecksumAddress(
      '0x14016E85a25aeb13065688cAFB43044C2ef86784'
    ),
    tokenB: web3Instance.utils.toChecksumAddress(
      '0x55d398326f99059ff775485246999027b3197955'
    ),
    symbol: 'TUSDUSDT'
  },
];

