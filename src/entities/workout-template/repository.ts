import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/db";
import { IWorkoutTemplateInput } from "./model";

const templateSelect = {
  publicId: true,
  name: true,
  muscleGroups: true,
  createdAt: true,
  exercises: {
    select: {
      publicId: true,
      name: true,
      sets: true,
      reps: true,
      order: true,
    },
    orderBy: { order: "asc" },
  },
} satisfies Prisma.WorkoutTemplateSelect;

function mapExercises(exercises: IWorkoutTemplateInput["exercises"]) {
  return exercises.map((exercise, index) => ({
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    order: index,
  }));
}

export const workoutTemplateRepository = {
  async create(userId: number, data: IWorkoutTemplateInput) {
    return prisma.workoutTemplate.create({
      data: {
        userId,
        name: data.name,
        muscleGroups: data.muscleGroups,
        exercises: { create: mapExercises(data.exercises) },
      },
      select: templateSelect,
    });
  },

  async listByUser(userId: number) {
    return prisma.workoutTemplate.findMany({
      where: { userId, deletedAt: null },
      select: templateSelect,
      orderBy: { createdAt: "desc" },
    });
  },

  async getByPublicId(userId: number, publicId: string) {
    return prisma.workoutTemplate.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: templateSelect,
    });
  },

  async update(userId: number, publicId: string, data: IWorkoutTemplateInput) {
    const template = await prisma.workoutTemplate.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: { id: true },
    });

    if (!template) return null;

    return prisma.workoutTemplate.update({
      where: { id: template.id },
      data: {
        name: data.name,
        muscleGroups: data.muscleGroups,
        exercises: {
          deleteMany: {},
          create: mapExercises(data.exercises),
        },
      },
      select: templateSelect,
    });
  },

  async softDelete(userId: number, publicId: string) {
    const template = await prisma.workoutTemplate.findFirst({
      where: { userId, publicId, deletedAt: null },
      select: { id: true },
    });

    if (!template) return null;

    return prisma.workoutTemplate.update({
      where: { id: template.id },
      data: { deletedAt: new Date() },
      select: { publicId: true },
    });
  },
};
