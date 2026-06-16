"use client";

import { cn } from "./cn";

interface ChipOption<T> {
  label: string;
  value: T;
}

interface ChipSelectProps<T> {
  label?: string;
  options: ChipOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  error?: string;
}

/** Seleção múltipla em formato de chips/tags. */
export function ChipSelect<T extends string | number>({
  label,
  options,
  value,
  onChange,
  error,
}: ChipSelectProps<T>) {
  function toggle(option: T) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-foreground/80">{label}</span>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value.includes(option.value);
          return (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => toggle(option.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-white"
                  : "border-black/10 bg-white text-foreground/70 hover:border-primary/40",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && (
        <span className="text-xs font-medium text-red-600">{error}</span>
      )}
    </div>
  );
}
