"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/shared/utils/session";
import { workoutSessionSchema } from "@/entities/workout-session/schema";
import { workoutSessionRepository } from "@/entities/workout-session/repository";
import { ActionResult, GENERIC_ERROR } from "@/shared/types/action";

export async function createWorkoutSession(
  input: unknown,
): Promise<ActionResult<{ publicId: string }>> {
  const parsed = workoutSessionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    const session = await workoutSessionRepository.create(userId, parsed.data);

    revalidatePath("/treinos");
    revalidatePath("/dashboard");
    return { success: true, data: { publicId: session.publicId } };
  } catch (error) {
    console.error("createWorkoutSession:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function updateWorkoutSession(
  publicId: string,
  input: unknown,
): Promise<ActionResult> {
  const parsed = workoutSessionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    const updated = await workoutSessionRepository.update(
      userId,
      publicId,
      parsed.data,
    );

    if (!updated) {
      return { success: false, error: "Treino não encontrado." };
    }

    revalidatePath("/treinos");
    revalidatePath(`/treinos/${publicId}`);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("updateWorkoutSession:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function deleteWorkoutSession(
  publicId: string,
): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const deleted = await workoutSessionRepository.softDelete(userId, publicId);

    if (!deleted) {
      return { success: false, error: "Treino não encontrado." };
    }

    revalidatePath("/treinos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("deleteWorkoutSession:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
