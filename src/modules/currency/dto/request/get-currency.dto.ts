import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCurrencyDto {
  @ApiProperty({ example: 'BNB', description: 'Symbol A' })
  @IsNotEmpty()
  @IsString()
  symbolA: string;

  @ApiProperty({ example: 'BTC', description: 'Symbol B' })
  @IsNotEmpty()
  @IsString()
  symbolB: string;
}
