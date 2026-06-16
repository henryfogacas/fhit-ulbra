import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/db";
import { IWorkoutSessionInput } from "./model";

const exerciseSelect = {
  publicId: true,
  name: true,
  sets: true,
  reps: true,
  weightKg: true,
  order: true,
} satisfies Prisma.ExerciseSelect;

const sessionSelect = {
  publicId: true,
  date: true,
  muscleGroups: true,
  notes: true,
  createdAt: true,
  exercises: {
    select: exerciseSelect,
    orderBy: { order: "asc" },
  },
} satisfies Prisma.WorkoutSessionSelect;

function mapExercises(exercises: IWorkoutSessionInput["exercises"]) {
  return exercises.map((exercise, index) => ({
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    weightKg: exercise.weightKg ?? null,
    order: index,
  }));
}

export const workoutSessionRepository = {
  async create(userId: number, data: IWorkoutSessionInput) {
    return prisma.workoutSession.create({
      data: {
        userId,
        date: new Date(data.date),
        muscleGroups: data.muscleGroups,
        notes: data.notes || null,
        exercises: { create: mapExercises(data.exercises) },
      },
      select: sessionSelect,
    });
  },

  async listByUser(
    userId: number,
    filters?: { from?: Date; to?: Date; muscleGroup?: string },
  ) {
    return prisma.workoutSession.findMany({
      where: {
        userId,
        deletedAt: null,
        ...(filters?.from || filters?.to
          ? {
              date: {
                ...(filters.from && { gte: filters.from }),
                ...(filters.to && { lte: filters.to }),
              },
            }
          : {}),
        ...(filters?.muscleGroup
          ? { muscleGroups: { has: filters.muscleGroup } }
          : {}),
      },
      select: sessionSelect,
      orderBy: { date: "desc" },
    });
  },

  async getByPublicId(userId: number, publicId: string) {
    return prisma.workoutSession.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: sessionSelect,
    });
  },

  async countInRange(userId: number, from: Date, to: Date) {
    return prisma.workoutSession.count({
      where: { userId, deletedAt: null, date: { gte: from, lte: to } },
    });
  },

  async update(userId: number, publicId: string, data: IWorkoutSessionInput) {
    const session = await prisma.workoutSession.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: { id: true },
    });

    if (!session) return null;

    // Substitui os exercícios por completo a cada edição.
    return prisma.workoutSession.update({
      where: { id: session.id },
      data: {
        date: new Date(data.date),
        muscleGroups: data.muscleGroups,
        notes: data.notes || null,
        exercises: {
          deleteMany: {},
          create: mapExercises(data.exercises),
        },
      },
      select: sessionSelect,
    });
  },

  async softDelete(userId: number, publicId: string) {
    const session = await prisma.workoutSession.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: { id: true },
    });

    if (!session) return null;

    return prisma.workoutSession.update({
      where: { id: session.id },
      data: { deletedAt: new Date() },
      select: { publicId: true },
    });
  },
};
