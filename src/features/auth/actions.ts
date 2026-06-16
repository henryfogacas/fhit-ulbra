"use server";

import { createUserSchema } from "@/entities/user/schema";
import { userRepository } from "@/entities/user/repository";
import { ActionResult, GENERIC_ERROR } from "@/shared/types/action";

export async function registerUser(input: unknown): Promise<ActionResult> {
  const parsed = createUserSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const existing = await userRepository.existsByEmail(parsed.data.email);

    if (existing) {
      return { success: false, error: "Este e-mail já está cadastrado." };
    }

    await userRepository.create({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    return { success: true };
  } catch (error) {
    console.error("registerUser:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
