import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { HttpModule } from '@nestjs/axios';
import { axiosConfig } from 'src/config/axios.confg';

@Module({
  imports: [HttpModule.register(axiosConfig)],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
