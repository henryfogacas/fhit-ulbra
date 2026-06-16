import { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/10 bg-white/50 px-6 py-12 text-center">
      {icon && <div className="text-4xl opacity-60">{icon}</div>}
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-foreground/60">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
