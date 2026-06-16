import { z } from "zod";

export const templateExerciseInputSchema = z.object({
  name: z.string().min(1, "Nome do exercício é obrigatório"),
  sets: z.coerce.number().int().min(1, "Mínimo de 1 série"),
  reps: z.coerce.number().int().min(1, "Mínimo de 1 repetição"),
});

export const workoutTemplateSchema = z.object({
  name: z.string().min(1, "Nome do modelo é obrigatório"),
  muscleGroups: z
    .array(z.string())
    .min(1, "Selecione ao menos um grupo muscular"),
  exercises: z
    .array(templateExerciseInputSchema)
    .min(1, "Adicione ao menos um exercício"),
});

export type WorkoutTemplateFormData = z.infer<typeof workoutTemplateSchema>;
