"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Wraps a card grid: cards rise in as a staggered batch when they enter the
 * viewport, and lift slightly on hover (fine pointers only). Reduced-motion
 * users see the static grid.
 */
export function CardsReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (_context, contextSafe) => {
      const root = ref.current;
      if (!root || reduced || !contextSafe) return;
      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-card]"),
      );
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 28 });
      const batch = ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (targets) =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
          }),
      });

      const cleanups: Array<() => void> = [];
      if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach((card) => {
          const enter = contextSafe(() =>
            gsap.to(card, { y: -8, duration: 0.5, ease: "power3.out" }),
          );
          const leave = contextSafe(() =>
            gsap.to(card, { y: 0, duration: 0.5, ease: "power2.out" }),
          );
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
          });
        });
      }

      return () => {
        batch.forEach((trigger) => trigger.kill());
        cleanups.forEach((fn) => fn());
      };
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
