"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type WordHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Reveals a heading word by word (masked) on scroll — distinct from SplitHeading
 * (line-level) and HeroReveal (char-level). Designed for large display headings
 * like the Contact section where a heavier, more cinematic entrance is needed.
 */
export function WordHeading({ children, as, className }: WordHeadingProps) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const split = SplitText.create(el, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 82%" },
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
