import { Finance, FinanceHistory } from 'generated/prisma';

export const getPromptForAi = (finance: Finance, array: FinanceHistory[]) => {
  const expensesText = array
    .map((e) => `${e.category} — ${e.spent} тг`)
    .join(', ');

    const aimessage = `
    Дай максимально краткий и полезный финансовый совет на основе моих данных:

    Бюджет на месяц: ${finance.budjet} тг.
    Сбережение: ${finance.savings} тг.
    В общем потрачено: ${finance.spent} тг.
    Последние траты: ${expensesText ? expensesText : "нету"}

    Проанализируй структуру расходов, оцени риск перерасхода, предложи оптимизацию бюджета и укажи, что стоит изменить в привычках.
    `;

    return aimessage;
};
