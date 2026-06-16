import { z } from "zod";

export const exerciseInputSchema = z.object({
  name: z.string().min(1, "Nome do exercício é obrigatório"),
  sets: z.coerce.number().int().min(1, "Mínimo de 1 série"),
  reps: z.coerce.number().int().min(1, "Mínimo de 1 repetição"),
  weightKg: z.coerce
    .number()
    .min(0, "Carga inválida")
    .nullable()
    .optional(),
});

export const workoutSessionSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  muscleGroups: z
    .array(z.string())
    .min(1, "Selecione ao menos um grupo muscular"),
  notes: z.string().max(500, "Máximo de 500 caracteres").optional(),
  exercises: z
    .array(exerciseInputSchema)
    .min(1, "Adicione ao menos um exercício"),
});

export type WorkoutSessionFormData = z.infer<typeof workoutSessionSchema>;
