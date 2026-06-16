import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().min(1, "Nome do hábito é obrigatório"),
  description: z.string().max(255, "Máximo de 255 caracteres").optional(),
  frequency: z
    .array(z.coerce.number().int().min(0).max(6))
    .min(1, "Selecione ao menos um dia da semana"),
});

export type HabitFormData = z.infer<typeof habitSchema>;
