"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MUSCLE_GROUPS } from "@/entities/workout-session/model";
import { Card } from "@/shared/ui";

/** Filtros do histórico por período e grupo muscular (UC05). */
export function WorkoutFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/treinos?${params.toString()}`);
  }

  const baseClass =
    "h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/15";

  return (
    <Card className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground/80">De</span>
        <input
          type="date"
          defaultValue={searchParams.get("from") ?? ""}
          onChange={(e) => updateParam("from", e.target.value)}
          className={baseClass}
        />
      </label>
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground/80">Até</span>
        <input
          type="date"
          defaultValue={searchParams.get("to") ?? ""}
          onChange={(e) => updateParam("to", e.target.value)}
          className={baseClass}
        />
      </label>
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground/80">
          Grupo muscular
        </span>
        <select
          defaultValue={searchParams.get("muscleGroup") ?? ""}
          onChange={(e) => updateParam("muscleGroup", e.target.value)}
          className={baseClass}
        >
          <option value="">Todos</option>
          {MUSCLE_GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
    </Card>
  );
}
