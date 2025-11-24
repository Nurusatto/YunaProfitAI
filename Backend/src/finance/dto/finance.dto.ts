import { Type } from 'class-transformer';
import { IsArray, IsDecimal, IsString } from 'class-validator';
import { FinanceHistoryDto } from './finance-history';

export class FinanceDto {
  @IsString()
  @IsDecimal()
  budjet: string;

  @IsString()
  @IsDecimal()
  spent: string;

  @IsString()
  @IsDecimal()
  remaining: string;

  @IsString()
  @IsDecimal()
  savings: string;

  @IsString()
  @IsArray()
  @Type(() => FinanceHistoryDto)
  financeHistories?: FinanceHistoryDto[];
}
