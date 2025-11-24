import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { Finance } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinanceSpendDto } from './dto/finance-spend.dto';
import { firstValueFrom } from 'rxjs';
import { getPromptForAi } from 'src/utils/prompt-for-ai';

@Injectable()
export class FinanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getByUserId(userId: string) {
    const finance = await this.prisma.finance.findUnique({
      where: {
        userId,
      },
      include: {
        financeHistories: true,
      },
    });

    return finance;
  }

  async spendMoney(userId: string, dto: FinanceSpendDto) {
    const { spent, category } = dto;
    const finance = (await this.prisma.finance.findUnique({
      where: { userId },
    })) as Finance;

    const isMoreThanBudjet = Decimal(spent).gt(finance.budjet);

    if (isMoreThanBudjet) {
      throw new ConflictException(
        'Вы не можете потратить денег больше чем имеете в бюджете!',
      );
    }

    const remaining = finance.budjet.minus(spent);
    const spentUpdated = finance.spent.plus(spent);

    await this.prisma.financeHistory.create({
      data: {
        financeId: finance.id,
        spent,
        category,
      },
    });

    const newFinance = await this.prisma.finance.update({
      where: {
        userId,
      },
      data: {
        remaining,
        spent: spentUpdated,
      },
      include: {
        financeHistories: true,
      },
    });

    const aiAdvice = await firstValueFrom(
      this.httpService.post('/', {
        model: 'gemini-2.5-flash-lite',
        messages: [{ role: 'user', content: getPromptForAi(newFinance, newFinance.financeHistories) }],
      }),
    );

    return { newFinance, aiAdvice: aiAdvice.data };
  }
}
