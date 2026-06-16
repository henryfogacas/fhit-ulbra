"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Badge, Card, ConfirmDialog, useToast } from "@/shared/ui";
import { weekdayShort } from "@/shared/utils/date";
import { HabitListItem } from "../service";
import { deleteHabit } from "../actions";

export function HabitCard({ habit }: { habit: HabitListItem }) {
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    const result = await deleteHabit(habit.publicId);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Hábito excluído.");
    router.refresh();
  }

  const isEveryDay = habit.frequency.length === 7;

  return (
    <Card className="flex items-start justify-between gap-3">
      <div>
        <p className="font-medium text-foreground">{habit.name}</p>
        {habit.description && (
          <p className="mt-0.5 text-sm text-foreground/60">
            {habit.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {isEveryDay ? (
            <Badge>Todos os dias</Badge>
          ) : (
            [...habit.frequency]
              .sort((a, b) => a - b)
              .map((d) => <Badge key={d}>{weekdayShort(d)}</Badge>)
          )}
        </div>
      </div>
      <div className="flex gap-1">
        <Link
          href={`/habitos/${habit.publicId}`}
          className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-primary/5 hover:text-primary"
          aria-label="Editar hábito"
        >
          <Pencil size={16} />
        </Link>
        <ConfirmDialog
          title="Excluir hábito"
          description="O histórico de conclusões será preservado. Deseja excluir este hábito?"
          confirmLabel="Excluir"
          onConfirm={handleDelete}
          trigger={(open) => (
            <button
              onClick={open}
              className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Excluir hábito"
            >
              <Trash2 size={16} />
            </button>
          )}
        />
      </div>
    </Card>
  );
}
