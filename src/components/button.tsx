import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "icon-xs";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const VARIANT: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-border bg-transparent hover:bg-accent",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  ghost: "bg-transparent hover:bg-accent",
};

const SIZE: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  "icon-xs": "size-7 p-0",
};

export function Button({
  variant = "default",
  size = "default",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
