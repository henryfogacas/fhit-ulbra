import { cn } from "./cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary",
        className,
      )}
    />
  );
}

/** Estado de carregamento centralizado para listas/painéis (RF20). */
export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-foreground/50">
      <Spinner className="h-7 w-7" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

/** Bloco de esqueleto para placeholders de carregamento. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-black/5", className)}
    />
  );
}
