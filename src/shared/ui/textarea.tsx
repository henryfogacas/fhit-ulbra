import { TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "./cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={fieldId}
            className="text-sm font-medium text-foreground/80"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          className={cn(
            "min-h-[88px] rounded-xl border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:ring-4",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-black/10 focus:border-primary focus:ring-primary/15",
            className,
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-600">{error}</span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
