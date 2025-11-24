import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FinanceHistoryDto {
  @IsString()
  financeId: string; // связка с Finance

  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  spent?: number;
}
