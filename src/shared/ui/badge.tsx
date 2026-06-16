import { HTMLAttributes } from "react";
import { cn } from "./cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
}

export function Badge({ className, color, style, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        !color && "bg-primary/10 text-primary",
        className,
      )}
      style={
        color
          ? { backgroundColor: `${color}1a`, color, ...style }
          : style
      }
      {...props}
    />
  );
}
