"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { cn, useToast } from "@/shared/ui";
import { toDateInputValue } from "@/shared/utils/date";
import { ChecklistItem as ChecklistItemData } from "../service";
import { toggleHabitCompletion } from "../actions";

export function ChecklistItem({ item }: { item: ChecklistItemData }) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [checked, setChecked] = useState(item.completedToday);

  function handleToggle() {
    const next = !checked;
    setChecked(next); // atualização otimista

    startTransition(async () => {
      const today = toDateInputValue(new Date());
      const result = await toggleHabitCompletion(item.publicId, today, next);

      if (!result.success) {
        setChecked(!next); // reverte
        toast.error(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors disabled:opacity-70",
        checked
          ? "border-primary/30 bg-primary/5"
          : "border-black/10 bg-white hover:border-primary/30",
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 transition-colors",
          checked
            ? "border-primary bg-primary text-white"
            : "border-black/20 bg-white",
        )}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <div className="flex-1">
        <p
          className={cn(
            "font-medium",
            checked ? "text-foreground/50 line-through" : "text-foreground",
          )}
        >
          {item.name}
        </p>
        {item.description && (
          <p className="text-xs text-foreground/50">{item.description}</p>
        )}
      </div>
    </button>
  );
}
