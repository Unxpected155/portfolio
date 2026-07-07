"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useViewTransition } from "@/components/motion/TransitionProvider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { Dictionary, Lang } from "@/content/types";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type LenisLike = {
  start: () => void;
  stop: () => void;
  scrollTo: (target: Element | number, opts?: { offset?: number }) => void;
};

export function Header({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { navigate } = useViewTransition();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Order mirrors the on-page section order (and their SectionNumber values).
  const nav = [
    { href: "#about", id: "about", label: dict.nav.about },
    { href: "#work", id: "work", label: dict.nav.work },
    { href: "#experience", id: "experience", label: dict.experience.label },
    { href: "#stack", id: "stack", label: dict.stack.label },
    { href: "#contact", id: "contact", label: dict.nav.contact },
  ];

  // Highlight the section currently in view. Rebinds after a route change.
  useEffect(() => {
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
  }, [pathname]);

  // Lock background scroll + Escape to close while the menu is open.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Open / close the full-screen menu.
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll<HTMLElement>(".menu-item");
      const meta = overlay.querySelectorAll<HTMLElement>(".menu-meta");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(overlay, { autoAlpha: open ? 1 : 0, clipPath: "none" });
        gsap.set([items, meta], { autoAlpha: open ? 1 : 0, y: 0 });
        return;
      }

      if (open) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" },
        );
        gsap.fromTo(
          items,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.07,
            delay: 0.25,
          },
        );
        gsap.fromTo(
          meta,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.5 },
        );
      } else {
        gsap.to(overlay, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => gsap.set(overlay, { autoAlpha: 0 }),
        });
      }
    },
    { dependencies: [open] },
  );

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    setOpen(false);
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { offset: -90 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-bg/75 px-5 py-2.5 backdrop-blur-md">
          <Link
            href={`/${lang}`}
            className="font-display text-lg font-bold tracking-tight"
            aria-label={dict.name}
          >
            {site.initials}
            <span className="text-accent">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-mono text-xs">
              <Link
                href="/es"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/es");
                }}
                aria-current={lang === "es" ? "true" : undefined}
                className={cn(
                  "cursor-pointer rounded-full px-2.5 py-1 transition-colors",
                  lang === "es"
                    ? "bg-accent-soft text-accent"
                    : "text-faint hover:text-text",
                )}
              >
                ES
              </Link>
              <Link
                href="/en"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/en");
                }}
                aria-current={lang === "en" ? "true" : undefined}
                className={cn(
                  "cursor-pointer rounded-full px-2.5 py-1 transition-colors",
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
              className="flex cursor-pointer items-center gap-2.5 text-sm font-medium"
            >
              <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted sm:inline">
                {open
                  ? lang === "es"
                    ? "Cerrar"
                    : "Close"
                  : lang === "es"
                    ? "Menú"
                    : "Menu"}
              </span>
              <span className="menu-toggle-icon" data-open={open}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="menu-overlay"
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pt-24 pb-12">
          <nav aria-label={lang === "es" ? "Menú principal" : "Main menu"}>
            <ul className="flex flex-col gap-1 sm:gap-2">
              {nav.map((item, index) => (
                <li key={item.href} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(event) => handleItemClick(event, item.href)}
                    className={cn(
                      "menu-item group flex items-baseline gap-4 py-1 font-display text-5xl font-bold tracking-tight transition-colors duration-300 sm:text-7xl",
                      active === item.id
                        ? "text-accent"
                        : "text-text hover:text-accent",
                    )}
                  >
                    <span className="font-mono text-base font-medium text-faint sm:text-lg">
                      0{index + 1}
                    </span>
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-3">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-meta mt-12 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              <Mail className="size-4" aria-hidden="true" />
              {site.email}
            </a>
            <div className="flex items-center gap-5">
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="text-muted transition-colors hover:text-accent"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-accent"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
