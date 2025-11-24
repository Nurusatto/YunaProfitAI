import { IsDecimal, IsString } from 'class-validator';

export class FinanceSavingsDto {
  @IsString()
  @IsDecimal()
  savings: string;
}
