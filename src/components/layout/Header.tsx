"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Dictionary, Lang } from "@/content/types";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const nav = [
    { href: "#about", id: "about", label: dict.nav.about },
    { href: "#work", id: "work", label: dict.nav.work },
    { href: "#contact", id: "contact", label: dict.nav.contact },
  ];

  // Highlight the nav item for the section currently in view.
  useGSAP(() => {
    const triggers = nav
      .map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        });
      })
      .filter(Boolean);
    return () => triggers.forEach((t) => t?.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, {});

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const primaryLabel =
    lang === "es" ? "Navegación principal" : "Primary navigation";

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

        <nav className="hidden items-center gap-7 sm:flex" aria-label={primaryLabel}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "text-sm transition-colors",
                active === item.id ? "text-accent" : "text-muted hover:text-text",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 font-mono text-xs">
            <Link
              href="/es"
              aria-current={lang === "es" ? "true" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                lang === "es"
                  ? "bg-accent-soft text-accent"
                  : "text-faint hover:text-text",
              )}
            >
              ES
            </Link>
            <Link
              href="/en"
              aria-current={lang === "en" ? "true" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                lang === "en"
                  ? "bg-accent-soft text-accent"
                  : "text-faint hover:text-text",
              )}
            >
              EN
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            className="ml-1 grid size-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:text-text sm:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border bg-bg/90 backdrop-blur-md transition-all duration-300 sm:hidden",
          open
            ? "max-h-72 border-border opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav
          className="flex flex-col p-2"
          aria-label={lang === "es" ? "Navegación móvil" : "Mobile navigation"}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "rounded-xl px-4 py-3 text-sm transition-colors",
                active === item.id
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface-2 hover:text-text",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
