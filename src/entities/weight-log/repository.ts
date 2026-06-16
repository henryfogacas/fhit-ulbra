import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/db";
import { IWeightLogInput } from "./model";

const weightSelect = {
  publicId: true,
  weightKg: true,
  date: true,
  createdAt: true,
} satisfies Prisma.WeightLogSelect;

export const weightLogRepository = {
  async create(userId: number, data: IWeightLogInput) {
    return prisma.weightLog.create({
      data: {
        userId,
        weightKg: data.weightKg,
        date: new Date(data.date),
      },
      select: weightSelect,
    });
  },

  async listByUser(userId: number) {
    return prisma.weightLog.findMany({
      where: { userId, deletedAt: null },
      select: weightSelect,
      orderBy: { date: "desc" },
    });
  },

  /** Registro de peso mais recente, usado para o cálculo de IMC. */
  async latest(userId: number) {
    return prisma.weightLog.findFirst({
      where: { userId, deletedAt: null },
      select: weightSelect,
      orderBy: { date: "desc" },
    });
  },

  async getInRange(userId: number, from: Date, to: Date) {
    return prisma.weightLog.findMany({
      where: { userId, deletedAt: null, date: { gte: from, lte: to } },
      select: weightSelect,
      orderBy: { date: "asc" },
    });
  },

  async softDelete(userId: number, publicId: string) {
    const log = await prisma.weightLog.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: { id: true },
    });

    if (!log) return null;

    return prisma.weightLog.update({
      where: { id: log.id },
      data: { deletedAt: new Date() },
      select: { publicId: true },
    });
  },
};
