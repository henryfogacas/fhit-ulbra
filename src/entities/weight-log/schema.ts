import { z } from "zod";

export const weightLogSchema = z.object({
  weightKg: z.coerce
    .number()
    .min(20, "Peso mínimo de 20 kg")
    .max(400, "Peso máximo de 400 kg"),
  date: z.string().min(1, "Data é obrigatória"),
});

export const heightSchema = z.object({
  heightCm: z.coerce
    .number()
    .min(100, "Altura mínima de 100 cm")
    .max(250, "Altura máxima de 250 cm"),
});

export type WeightLogFormData = z.infer<typeof weightLogSchema>;
export type HeightFormData = z.infer<typeof heightSchema>;
