import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  symbolA: string;

  @IsNotEmpty()
  @IsString()
  symbolB: string;

  @IsNotEmpty()
  @IsString()
  pair: string;

  @IsNotEmpty()
  @IsString()
  pairAddressUni: string;

  @IsNotEmpty()
  @IsString()
  timestamp: Date;

  @IsNotEmpty()
  rate: number;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}
