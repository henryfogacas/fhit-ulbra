"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/shared/utils/session";
import { habitSchema } from "@/entities/habit/schema";
import { habitRepository } from "@/entities/habit/repository";
import { habitCompletionRepository } from "@/entities/habit-completion/repository";
import { ActionResult, GENERIC_ERROR } from "@/shared/types/action";

export async function createHabit(input: unknown): Promise<ActionResult> {
  const parsed = habitSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    await habitRepository.create(userId, parsed.data);

    revalidatePath("/habitos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("createHabit:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function updateHabit(
  publicId: string,
  input: unknown,
): Promise<ActionResult> {
  const parsed = habitSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  try {
    const userId = await requireUserId();
    const updated = await habitRepository.update(userId, publicId, parsed.data);

    if (!updated) {
      return { success: false, error: "Hábito não encontrado." };
    }

    revalidatePath("/habitos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("updateHabit:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function deleteHabit(publicId: string): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const deleted = await habitRepository.softDelete(userId, publicId);

    if (!deleted) {
      return { success: false, error: "Hábito não encontrado." };
    }

    revalidatePath("/habitos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("deleteHabit:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

/** Marca/desmarca a conclusão de um hábito em uma data (UC09). */
export async function toggleHabitCompletion(
  habitPublicId: string,
  dateInput: string,
  completed: boolean,
): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const habit = await habitRepository.getInternalId(userId, habitPublicId);

    if (!habit) {
      return { success: false, error: "Hábito não encontrado." };
    }

    await habitCompletionRepository.setCompletion(
      habit.id,
      new Date(dateInput),
      completed,
    );

    revalidatePath("/habitos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("toggleHabitCompletion:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
