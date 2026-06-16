import { prisma } from "@/prisma/db";

export const habitCompletionRepository = {
  /**
   * Marca/desmarca a conclusão de um hábito em uma data (UC09).
   * O hábito precisa pertencer ao usuário (validado na action).
   */
  async setCompletion(habitId: number, date: Date, completed: boolean) {
    return prisma.habitCompletion.upsert({
      where: { habitId_date: { habitId, date } },
      create: { habitId, date, completed },
      update: { completed },
      select: { publicId: true, completed: true },
    });
  },

  /** Conclusões de todos os hábitos do usuário em uma data específica. */
  async getForDate(userId: number, date: Date) {
    return prisma.habitCompletion.findMany({
      where: {
        date,
        completed: true,
        habit: { userId, deletedAt: null },
      },
      select: { habitId: true, habit: { select: { publicId: true } } },
    });
  },

  /** Conclusões em um intervalo, para cálculo de streak e dashboards. */
  async getInRange(userId: number, from: Date, to: Date) {
    return prisma.habitCompletion.findMany({
      where: {
        date: { gte: from, lte: to },
        completed: true,
        habit: { userId },
      },
      select: { habitId: true, date: true },
    });
  },
};
