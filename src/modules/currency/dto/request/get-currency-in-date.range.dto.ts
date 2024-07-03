import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class GetCurrencyInDateRangeDto {
  @ApiProperty({ example: '2024-07-02', description: 'Start date' })
  @IsNotEmpty()
  @IsDateString()
  dateStart: string;

  @ApiProperty({ example: '2024-07-03', description: 'End date' })
  @IsNotEmpty()
  @IsDateString()
  dateEnd: string;

  @ApiProperty({ example: 'BNB', description: 'Symbol A' })
  @IsNotEmpty()
  @IsString()
  symbolA: string;

  @ApiProperty({ example: 'BTC', description: 'Symbol B' })
  @IsNotEmpty()
  @IsString()
  symbolB: string;
}
