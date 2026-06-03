"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Scroll-reactive background: two soft accent glows that travel across the
 * viewport and shift intensity as the page is scrolled, giving a sense of
 * journey from section to section. Fixed, behind all content, pointer-inert.
 * Reduced-motion users get the static base gradient.
 */
export function BackgroundFX() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || reduced) return;
      const a = el.querySelector<HTMLElement>(".bg-blob-a");
      const b = el.querySelector<HTMLElement>(".bg-blob-b");
      if (!a || !b) return;

      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Primary glow drifts across the page as you scroll.
      tl.to(a, { x: () => vw() * 0.5, y: () => vh() * 0.25, opacity: 0.65 })
        .to(a, { x: () => vw() * 0.08, y: () => vh() * 0.6, opacity: 0.42 })
        .to(a, { x: () => vw() * 0.55, y: () => vh() * 0.45, opacity: 0.6 })
        .to(a, { x: () => vw() * 0.18, y: () => vh() * 0.75, opacity: 0.5 });

      // Secondary glow moves in counterpoint (parallel, offset positions).
      tl.to(b, { x: () => -vw() * 0.3, y: () => vh() * 0.45, opacity: 0.4 }, 0)
        .to(b, { x: () => vw() * 0.3, y: () => vh() * 0.12, opacity: 0.28 }, 1)
        .to(b, { x: () => -vw() * 0.12, y: () => vh() * 0.65, opacity: 0.4 }, 2)
        .to(b, { x: () => vw() * 0.35, y: () => vh() * 0.25, opacity: 0.3 }, 3);
    },
    { dependencies: [reduced], scope: root },
  );

  return (
    <div ref={root} className="bg-fx" aria-hidden="true">
      <div className="bg-blob bg-blob-a" />
      <div className="bg-blob bg-blob-b" />
    </div>
  );
}
