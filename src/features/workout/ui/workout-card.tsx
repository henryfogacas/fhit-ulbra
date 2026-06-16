"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { IWorkoutSession } from "@/entities/workout-session/model";
import { Badge, Card, ConfirmDialog, useToast } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { deleteWorkoutSession } from "../actions";

export function WorkoutCard({ session }: { session: IWorkoutSession }) {
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    const result = await deleteWorkoutSession(session.publicId);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Treino excluído.");
    router.refresh();
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {formatDate(session.date)}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {session.muscleGroups.map((g) => (
              <Badge key={g}>{g}</Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href={`/treinos/${session.publicId}`}
            className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-primary/5 hover:text-primary"
            aria-label="Editar treino"
          >
            <Pencil size={16} />
          </Link>
          <ConfirmDialog
            title="Excluir treino"
            description="Esta ação não pode ser desfeita. Deseja realmente excluir este treino?"
            confirmLabel="Excluir"
            onConfirm={handleDelete}
            trigger={(open) => (
              <button
                onClick={open}
                className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label="Excluir treino"
              >
                <Trash2 size={16} />
              </button>
            )}
          />
        </div>
      </div>

      <div className="divide-y divide-black/5 overflow-hidden rounded-xl border border-black/5">
        {session.exercises.map((ex) => (
          <div
            key={ex.publicId}
            className="flex items-center justify-between bg-white px-3.5 py-2.5 text-sm"
          >
            <span className="font-medium text-foreground">{ex.name}</span>
            <span className="text-foreground/60">
              {ex.sets} × {ex.reps}
              {ex.weightKg ? ` · ${ex.weightKg} kg` : ""}
            </span>
          </div>
        ))}
      </div>

      {session.notes && (
        <p className="text-sm text-foreground/60">{session.notes}</p>
      )}
    </Card>
  );
}
