"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Vertical offset (px) the content rises from. */
  y?: number;
  delay?: number;
  /** Stagger the element's direct children instead of moving the block as one. */
  stagger?: boolean;
  /** Per-item stagger delay in seconds (default 0.1). Only used when stagger=true. */
  staggerDelay?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

/**
 * Fades content up as it scrolls into view. With `stagger`, each direct child
 * reveals in sequence. Reduced-motion users see the content immediately.
 */
export function Reveal({
  children,
  as,
  className,
  y = 24,
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
  start = "top 85%",
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const targets: Element | Element[] = stagger
        ? Array.from(el.children)
        : el;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger: stagger ? staggerDelay : 0,
        scrollTrigger: { trigger: el, start },
      });
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
