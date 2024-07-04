import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCurrencyDto {
  @IsNotEmpty()
  @IsString()
  symbolA: string;

  @IsNotEmpty()
  @IsString()
  symbolB: string;
}
