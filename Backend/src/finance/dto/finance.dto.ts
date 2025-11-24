import { Type } from "class-transformer";
import { IsArray, IsNumber } from "class-validator";
import { FinanceHistoryDto } from "./finance-history";

export class FinanceDto {
  @IsNumber()
  budget?: number

  @IsNumber()
  spent?: number

  @IsNumber()
  remaining?: number

  @IsNumber()
  savings?: number

  @IsNumber()
  @IsArray()
  @Type(() => FinanceHistoryDto)
  financeHistories?: FinanceHistoryDto[];
}
