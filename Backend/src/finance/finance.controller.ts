import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Authorization } from 'src/decorators/authorization.decarator';
import { FinanceHistoryDto } from './dto/finance-history';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  @Authorization()
  getFinance(@GetUser('id') userId: string) {
    return this.financeService.getByUserId(userId);
  }

  @Post('spend')
  @Authorization()
  spendMoney(@GetUser('id') userId: string, @Body() dto: FinanceHistoryDto) {
    return this.financeService.spendMoney(userId, dto);
  }

  @Post('save')
  @Authorization()
  saveMoney(@GetUser('id') userId: string, @Body() data) {
    const { savings } = data;
    return this.financeService.saveMoney(userId, savings);
  }

  @Post('budjet')
  @Authorization()
  changeBudjet(@GetUser('id') userId: string, @Body() data) {
    const { budjet } = data;
    return this.financeService.changeBudjet(userId, budjet);
  }
}
