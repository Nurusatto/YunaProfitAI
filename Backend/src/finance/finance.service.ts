import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { Finance, FinanceHistory } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { getPromptForAi } from 'src/utils/prompt-for-ai';
import { FinanceHistoryDto } from './dto/finance-history';
import { FinanceDto } from './dto/finance.dto';

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

  async spendMoney(userId: string, dto: FinanceHistoryDto) {
    const { spent, category } = dto;
    const finance = (await this.prisma.finance.findUnique({
      where: { userId },
    })) as Finance;

    const isMoreThanBudjet = Decimal(spent).gt(finance.budjet);
    const isMoreThanRemainings = finance.remaining
      .plus(spent)
      .gt(finance.budjet);

    if (isMoreThanBudjet || isMoreThanRemainings) {
      throw new ConflictException(
        'Вы не можете потратить денег больше чем имеете в бюджете!',
      );
    }

    const remaining = finance.remaining.minus(spent);
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

    const aiAdvice = await this.getAiAnswer(
      newFinance,
      newFinance.financeHistories,
    );

    return { newFinance, aiAdvice };
  }

  async getAiAnswer(finance: Finance, financeHistories: FinanceHistory[]) {
    const aiAdvice = await firstValueFrom(
      this.httpService.post('/', {
        model: 'gemini-2.5-flash-lite',
        messages: [
          {
            role: 'user',
            content: getPromptForAi(finance, financeHistories),
          },
        ],
      }),
    );

    return aiAdvice.data;
  }

  async saveMoney(userId: string, savings: FinanceDto['savings']) {
    const finance = await this.prisma.finance.findUnique({ where: { userId } });

    const savingsUpdated = finance?.savings.plus(savings);
    const remainingUpdated = finance?.remaining.minus(savings);

    const newFinance = await this.prisma.finance.update({
      where: { userId },
      data: {
        savings: savingsUpdated,
        remaining: remainingUpdated,
      },
      include: { financeHistories: true },
    });

    const aiAdvice = await this.getAiAnswer(
      newFinance,
      newFinance.financeHistories,
    );

    return { newFinance, aiAdvice };
  }

  async changeBudjet(userId: string, budjet: string) {
    return await this.prisma.finance.update({
      where: { userId },
      data: { budjet, remaining: budjet },
    });
  }
}
