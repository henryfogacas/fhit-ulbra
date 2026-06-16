import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/db";
import { IHabitInput } from "./model";

const habitSelect = {
  publicId: true,
  name: true,
  description: true,
  frequency: true,
  active: true,
  createdAt: true,
} satisfies Prisma.HabitSelect;

export const habitRepository = {
  async create(userId: number, data: IHabitInput) {
    return prisma.habit.create({
      data: {
        userId,
        name: data.name,
        description: data.description || null,
        frequency: data.frequency,
      },
      select: habitSelect,
    });
  },

  async listActive(userId: number) {
    return prisma.habit.findMany({
      where: { userId, deletedAt: null, active: true },
      select: habitSelect,
      orderBy: { createdAt: "asc" },
    });
  },

  async getByPublicId(userId: number, publicId: string) {
    return prisma.habit.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: habitSelect,
    });
  },

  /** Resolve o id interno garantindo posse pelo usuário (isolamento de dados). */
  async getInternalId(userId: number, publicId: string) {
    return prisma.habit.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: { id: true },
    });
  },

  async update(userId: number, publicId: string, data: IHabitInput) {
    const habit = await this.getInternalId(userId, publicId);
    if (!habit) return null;

    return prisma.habit.update({
      where: { id: habit.id },
      data: {
        name: data.name,
        description: data.description || null,
        frequency: data.frequency,
      },
      select: habitSelect,
    });
  },

  async softDelete(userId: number, publicId: string) {
    const habit = await this.getInternalId(userId, publicId);
    if (!habit) return null;

    // Mantém o histórico de conclusões para auditoria (UC11).
    return prisma.habit.update({
      where: { id: habit.id },
      data: { deletedAt: new Date(), active: false },
      select: { publicId: true },
    });
  },
};
