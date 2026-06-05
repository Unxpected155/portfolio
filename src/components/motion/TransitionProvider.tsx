"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TransitionContextValue = { navigate: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export const useViewTransition = () => useContext(TransitionContext);

/**
 * "Curtain" view transition. Navigating closes two panels (they meet in the
 * middle) to cover the screen, then on the new view they part from the center
 * to reveal it while the content rises in. State crosses the navigation via
 * sessionStorage so it survives a layout remount; the reveal runs in a layout
 * effect (before paint) so there's no uncovered flash. Reduced-motion users
 * navigate instantly.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal (part the curtain) when arriving on a new path after a transition.
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || reduced) return;
      if (typeof sessionStorage === "undefined") return;
      if (!sessionStorage.getItem("vt-pending")) return;
      sessionStorage.removeItem("vt-pending");

      const top = el.querySelector(".vt-panel-top");
      const bottom = el.querySelector(".vt-panel-bottom");
      gsap.set(el, { autoAlpha: 1 });
      gsap.set(top, { yPercent: 0 });
      gsap.set(bottom, { yPercent: 0 });

      // Part the curtain; the remounted content replays its own entrance
      // animations underneath, so the new view enters with its own motion.
      const tl = gsap.timeline({
        onComplete: () => gsap.set(el, { autoAlpha: 0 }),
      });
      tl.to(top, { yPercent: -100, duration: 0.75, ease: "power3.inOut", delay: 0.15 }, 0)
        .to(bottom, { yPercent: 100, duration: 0.75, ease: "power3.inOut", delay: 0.15 }, 0);
    },
    { dependencies: [pathname] },
  );

  const navigate = (href: string) => {
    if (reduced || href === pathname) {
      router.push(href);
      return;
    }
    const el = containerRef.current;
    if (!el) {
      router.push(href);
      return;
    }
    const top = el.querySelector(".vt-panel-top");
    const bottom = el.querySelector(".vt-panel-bottom");
    gsap.set(el, { autoAlpha: 1 });
    gsap.set(top, { yPercent: -100 });
    gsap.set(bottom, { yPercent: 100 });
    gsap.to([top, bottom], {
      yPercent: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        sessionStorage.setItem("vt-pending", "1");
        router.push(href);
      },
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={containerRef} className="vt-curtain" aria-hidden="true">
        <span className="vt-panel vt-panel-top" />
        <span className="vt-panel vt-panel-bottom" />
      </div>
    </TransitionContext.Provider>
  );
}
