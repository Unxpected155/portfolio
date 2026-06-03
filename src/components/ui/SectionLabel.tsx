import { cn } from "@/lib/cn";

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em] text-faint",
        className,
      )}
    >
      <span className="text-accent">{index}</span>
      <span aria-hidden="true"> — </span>
      {children}
    </p>
  );
}
