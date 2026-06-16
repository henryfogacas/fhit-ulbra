"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/shared/utils/session";
import { heightSchema } from "@/entities/weight-log/schema";
import { userRepository } from "@/entities/user/repository";
import { ActionResult, GENERIC_ERROR } from "@/shared/types/action";

export async function updateHeight(input: unknown): Promise<ActionResult> {
  const parsed = heightSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    await userRepository.updateHeight(userId, parsed.data.heightCm);

    revalidatePath("/perfil");
    revalidatePath("/peso");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("updateHeight:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
