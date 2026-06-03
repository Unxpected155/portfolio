import Link from "next/link";
import type { Dictionary, Lang } from "@/content/types";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const other: Lang = lang === "es" ? "en" : "es";
  // Order mirrors the on-page section order (About → Work → Contact).
  const nav = [
    { href: "#about", label: dict.nav.about },
    { href: "#work", label: dict.nav.work },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-20 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-bg/75 px-5 py-2.5 backdrop-blur-md">
        <Link
          href={`/${lang}`}
          className="font-display text-lg font-bold tracking-tight"
          aria-label={dict.name}
        >
          {site.initials}
          <span className="text-accent">.</span>
        </Link>

        <nav
          className="hidden items-center gap-7 sm:flex"
          aria-label={lang === "es" ? "Navegación principal" : "Primary navigation"}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 font-mono text-xs">
          <Link
            href="/es"
            aria-current={lang === "es" ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              lang === "es" ? "bg-accent-soft text-accent" : "text-faint hover:text-text",
            )}
          >
            ES
          </Link>
          <Link
            href="/en"
            aria-current={lang === "en" ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              lang === "en" ? "bg-accent-soft text-accent" : "text-faint hover:text-text",
            )}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  );
}
