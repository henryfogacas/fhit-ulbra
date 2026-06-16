import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const createUserSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
  });

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido"),
});
