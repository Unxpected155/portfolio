"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Seamless infinite marquee that speeds up / changes direction with the scroll
 * velocity. Renders the children twice so the loop has no seam. Static for
 * reduced-motion users.
 */
export function Marquee({
  children,
  direction = 1,
  speed = 28,
  className,
}: {
  children: ReactNode;
  /** 1 = scrolls left, -1 = scrolls right. */
  direction?: 1 | -1;
  /** Seconds per full cycle (lower = faster). */
  speed?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || reduced) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      });
      tween.timeScale(direction);

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const ts = gsap.utils.clamp(
            -3,
            3,
            direction + self.getVelocity() / 1200,
          );
          tween.timeScale(ts);
          gsap.to(tween, {
            timeScale: direction,
            duration: 1.1,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { dependencies: [reduced], scope: trackRef },
  );

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className={cn("flex w-max", className)}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
