import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[0.95rem] font-semibold transition-colors duration-200 ease-out cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "border border-border text-text hover:bg-surface-2 hover:border-accent",
};

export function Button({
  href,
  external,
  variant = "primary",
  className,
  children,
  type = "button",
}: {
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
