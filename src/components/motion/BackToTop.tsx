"use client";

import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SIZE = 48;
const STROKE = 2;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type LenisLike = { scrollTo: (target: number, opts?: { duration?: number }) => void };

/**
 * Back-to-top control with a progress ring that fills as the page is scrolled
 * (merges scroll progress + the action into one element). Appears after the
 * first viewport. Uses Lenis for the smooth scroll, native fallback otherwise.
 */
export function BackToTop({ label }: { label: string }) {
  const progressRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(() => {
    const circle = progressRef.current;
    if (!circle) return;
    gsap.set(circle, {
      strokeDasharray: CIRCUMFERENCE,
      strokeDashoffset: CIRCUMFERENCE,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(circle, {
          strokeDashoffset: CIRCUMFERENCE * (1 - self.progress),
        });
        setVisible(self.scroll() > window.innerHeight * 0.6);
      },
    });
    return () => trigger.kill();
  }, {});

  const handleClick = () => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis && !reduced) {
      lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`group fixed bottom-6 right-6 z-30 grid size-12 cursor-pointer place-items-center rounded-full border border-border bg-bg/70 text-text backdrop-blur-md transition duration-300 hover:border-accent ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          className="fill-none stroke-border"
          strokeWidth={STROKE}
          opacity={0.4}
        />
        <circle
          ref={progressRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          className="fill-none stroke-accent"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp
        className="relative size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}
