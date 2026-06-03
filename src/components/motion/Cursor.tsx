"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERACTIVE = "a, button, [data-card]";

/**
 * Custom cursor: a small dot that tracks tightly and a ring that trails and
 * grows over interactive elements. Only runs on fine pointers (mouse) and
 * never for reduced-motion users.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (_context, contextSafe) => {
      if (reduced || !contextSafe) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 1 });
      document.documentElement.classList.add("cursor-hidden");

      const moveDotX = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3" });
      const moveDotY = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3" });
      const moveRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
      const moveRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

      const onMove = (event: PointerEvent) => {
        moveDotX(event.clientX);
        moveDotY(event.clientY);
        moveRingX(event.clientX);
        moveRingY(event.clientY);
      };
      const onOver = contextSafe((event: PointerEvent) => {
        if ((event.target as HTMLElement).closest(INTERACTIVE)) {
          gsap.to(ring, { scale: 1.7, opacity: 0.9, duration: 0.4, ease: "power3.out" });
        }
      });
      const onOut = contextSafe((event: PointerEvent) => {
        if ((event.target as HTMLElement).closest(INTERACTIVE)) {
          gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.4, ease: "power3.out" });
        }
      });

      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
        document.documentElement.classList.remove("cursor-hidden");
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
