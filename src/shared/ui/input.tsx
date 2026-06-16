"use client";

import { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "./cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = "text", ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground/80"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:ring-4",
              isPassword && "pr-11",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-black/10 focus:border-primary focus:ring-primary/15",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-foreground/40 transition-colors hover:text-primary"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error ? (
          <span className="text-xs font-medium text-red-600">{error}</span>
        ) : hint ? (
          <span className="text-xs text-foreground/50">{hint}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
