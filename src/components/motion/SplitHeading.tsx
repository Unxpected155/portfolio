"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SplitHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Reveals a heading line by line (masked) as it scrolls into view. Waits for
 * fonts so the line breaks are measured correctly. Reduced-motion users get the
 * plain heading with no splitting.
 */
export function SplitHeading({ children, as, className }: SplitHeadingProps) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      // autoSplit re-splits once fonts load and on width changes, so line
      // breaks are always correct. The tween is created inside onSplit (so it
      // targets the fresh lines) and returned so SplitText syncs/cleans it up.
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        },
      });

      return () => {
        split.revert();
      };
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
