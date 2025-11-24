import { IsDecimal, IsString } from "class-validator";

export class FinanceSpendDto {
  @IsString()
  category: string

  @IsDecimal()
  spent: number
}
