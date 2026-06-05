"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Oversized, faint section index that sits behind the heading and parallaxes as
 * you scroll, with a subtle scroll-velocity skew for a kinetic feel. Purely
 * decorative (aria-hidden). Static for reduced-motion users.
 */
export function SectionNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const skewTo = gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3" });
      const tween = gsap.fromTo(
        el,
        { yPercent: -18 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) =>
              skewTo(gsap.utils.clamp(-6, 6, self.getVelocity() / 300)),
          },
        },
      );

      return () => tween.scrollTrigger?.kill();
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <span ref={ref} aria-hidden="true" className="section-number">
      {value}
    </span>
  );
}
