"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { IWeightLog } from "@/entities/weight-log/model";
import { ConfirmDialog, useToast } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date";
import { deleteWeightLog } from "../actions";

export function WeightLogItem({ log }: { log: IWeightLog }) {
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    const result = await deleteWeightLog(log.publicId);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Registro excluído.");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between border-b border-black/5 py-3 last:border-0">
      <span className="text-sm text-foreground/60">{formatDate(log.date)}</span>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-foreground">{log.weightKg} kg</span>
        <ConfirmDialog
          title="Excluir registro"
          description="Deseja excluir este registro de peso?"
          confirmLabel="Excluir"
          onConfirm={handleDelete}
          trigger={(open) => (
            <button
              onClick={open}
              className="rounded-lg p-1.5 text-foreground/40 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Excluir registro"
            >
              <Trash2 size={15} />
            </button>
          )}
        />
      </div>
    </div>
  );
}
