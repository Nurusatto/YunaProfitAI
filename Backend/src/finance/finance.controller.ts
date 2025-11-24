import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Authorization } from 'src/decorators/authorization.decarator';
import { FinanceSpendDto } from './dto/finance-spend.dto';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  @Authorization()
  getFinance(@GetUser('id') userId: string) {
    return this.financeService.getByUserId(userId);
  }

  @Post('/spend')
  @Authorization()
  spendMoney(@GetUser('id') userId: string, @Body() dto: FinanceSpendDto) {
    return this.financeService.spendMoney(userId, dto);
  }
}
