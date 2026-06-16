"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/shared/utils/session";
import { weightLogSchema } from "@/entities/weight-log/schema";
import { weightLogRepository } from "@/entities/weight-log/repository";
import { ActionResult, GENERIC_ERROR } from "@/shared/types/action";

export async function createWeightLog(input: unknown): Promise<ActionResult> {
  const parsed = weightLogSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    await weightLogRepository.create(userId, parsed.data);

    revalidatePath("/peso");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("createWeightLog:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function deleteWeightLog(publicId: string): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const deleted = await weightLogRepository.softDelete(userId, publicId);

    if (!deleted) {
      return { success: false, error: "Registro não encontrado." };
    }

    revalidatePath("/peso");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("deleteWeightLog:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
