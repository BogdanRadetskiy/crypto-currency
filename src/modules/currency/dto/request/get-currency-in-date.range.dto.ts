import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class GetCurrencyInDateRangeDto {
  @IsNotEmpty()
  @IsDateString()
  dateStart: string;

  @IsNotEmpty()
  @IsDateString()
  dateEnd: string;

  @IsNotEmpty()
  @IsString()
  symbolA: string;

  @IsNotEmpty()
  @IsString()
  symbolB: string;
}
