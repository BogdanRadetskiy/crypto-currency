import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Document } from 'mongoose';
@Schema({ collection: 'pairCurrency' })
export class Currency extends Document {
  @IsString()
  @IsNotEmpty()
  @Prop()
  symbolA: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  symbolB: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  pair: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  pairAddressUni: string;

  @IsDate()
  @Prop()
  timestamp: Date;

  @IsNumber()
  @Prop()
  rate: number;

  @IsBoolean()
  @Prop()
  isCorrect: boolean;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
