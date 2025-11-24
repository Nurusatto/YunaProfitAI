-- CreateEnum
CREATE TYPE "public"."InvestmentPeriod" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT DEFAULT 'User',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."finances" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "budjet" DECIMAL(65,30) NOT NULL DEFAULT 300000,
    "spent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "remaining" DECIMAL(65,30) NOT NULL DEFAULT 300000,
    "savings" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "finances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."finance_histories" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "finance_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "spent" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "finance_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."investment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "finance_id" TEXT NOT NULL,
    "investment" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "investment_income" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "investment_precent" INTEGER NOT NULL DEFAULT 0,
    "investment_period" "public"."InvestmentPeriod",
    "investment_date" TIMESTAMP(3),

    CONSTRAINT "investment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "finances_user_id_key" ON "public"."finances"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "investment_finance_id_key" ON "public"."investment"("finance_id");

-- AddForeignKey
ALTER TABLE "public"."finances" ADD CONSTRAINT "finances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."finance_histories" ADD CONSTRAINT "finance_histories_finance_id_fkey" FOREIGN KEY ("finance_id") REFERENCES "public"."finances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."investment" ADD CONSTRAINT "investment_finance_id_fkey" FOREIGN KEY ("finance_id") REFERENCES "public"."finances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
