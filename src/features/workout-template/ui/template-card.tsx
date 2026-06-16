"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Play } from "lucide-react";
import { IWorkoutTemplate } from "@/entities/workout-template/model";
import { Badge, Button, Card, ConfirmDialog, useToast } from "@/shared/ui";
import { deleteWorkoutTemplate } from "../actions";

export function TemplateCard({ template }: { template: IWorkoutTemplate }) {
  const router = useRouter();
  const toast = useToast();

  async function handleDelete() {
    const result = await deleteWorkoutTemplate(template.publicId);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Modelo excluído.");
    router.refresh();
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">{template.name}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {template.muscleGroups.map((g) => (
              <Badge key={g}>{g}</Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href={`/modelos/${template.publicId}`}
            className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-primary/5 hover:text-primary"
            aria-label="Editar modelo"
          >
            <Pencil size={16} />
          </Link>
          <ConfirmDialog
            title="Excluir modelo"
            description="Deseja realmente excluir este modelo de treino?"
            confirmLabel="Excluir"
            onConfirm={handleDelete}
            trigger={(open) => (
              <button
                onClick={open}
                className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label="Excluir modelo"
              >
                <Trash2 size={16} />
              </button>
            )}
          />
        </div>
      </div>

      <ul className="flex flex-col gap-1 text-sm text-foreground/70">
        {template.exercises.map((ex) => (
          <li key={ex.publicId} className="flex justify-between">
            <span>{ex.name}</span>
            <span className="text-foreground/50">
              {ex.sets} × {ex.reps}
            </span>
          </li>
        ))}
      </ul>

      <Link href={`/treinos/novo?modelo=${template.publicId}`}>
        <Button variant="secondary" size="sm" className="w-full">
          <Play size={16} /> Usar este modelo
        </Button>
      </Link>
    </Card>
  );
}
