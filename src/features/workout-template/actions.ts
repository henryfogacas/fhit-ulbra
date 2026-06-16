"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/shared/utils/session";
import { workoutTemplateSchema } from "@/entities/workout-template/schema";
import { workoutTemplateRepository } from "@/entities/workout-template/repository";
import { ActionResult, GENERIC_ERROR } from "@/shared/types/action";

export async function createWorkoutTemplate(
  input: unknown,
): Promise<ActionResult<{ publicId: string }>> {
  const parsed = workoutTemplateSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    const template = await workoutTemplateRepository.create(userId, parsed.data);

    revalidatePath("/modelos");
    return { success: true, data: { publicId: template.publicId } };
  } catch (error) {
    console.error("createWorkoutTemplate:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function updateWorkoutTemplate(
  publicId: string,
  input: unknown,
): Promise<ActionResult> {
  const parsed = workoutTemplateSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    const updated = await workoutTemplateRepository.update(
      userId,
      publicId,
      parsed.data,
    );

    if (!updated) {
      return { success: false, error: "Modelo não encontrado." };
    }

    revalidatePath("/modelos");
    revalidatePath(`/modelos/${publicId}`);
    return { success: true };
  } catch (error) {
    console.error("updateWorkoutTemplate:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function deleteWorkoutTemplate(
  publicId: string,
): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const deleted = await workoutTemplateRepository.softDelete(userId, publicId);

    if (!deleted) {
      return { success: false, error: "Modelo não encontrado." };
    }

    revalidatePath("/modelos");
    return { success: true };
  } catch (error) {
    console.error("deleteWorkoutTemplate:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
