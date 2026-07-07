"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Orchestrates the hero entrance on load: the title reveals line by line while
 * eyebrow, tagline, CTAs and the scroll hint fade up in sequence. A gentle
 * parallax drifts the block on scroll. The wrapper starts hidden (`anim-hidden`)
 * to avoid a flash; reduced-motion and no-JS fallbacks reveal it via CSS.
 *
 * Children should tag elements with `data-hero="eyebrow|title|tagline|cta|scroll"`.
 */
export function HeroReveal({
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
      if (!root || !contextSafe) return;
      const q = gsap.utils.selector(root);

      if (reduced) {
        gsap.set(root, { opacity: 1 });
        return;
      }

      let split: InstanceType<typeof SplitText> | undefined;

      // contextSafe so the timeline + ScrollTriggers created after fonts load
      // (async) are still registered to this useGSAP context and reverted on
      // unmount (e.g. language switch).
      const build = contextSafe(() => {
        gsap.set(root, { opacity: 1 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Header slides down into view with the hero sequence.
        const header = document.querySelector("header");
        if (header) {
          tl.fromTo(
            header,
            { y: -72, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0,
          );
        }

        // Ambient accent glow fades and expands behind the name.
        tl.fromTo(
          q('[data-hero="glow"]'),
          { opacity: 0, scale: 0.82 },
          { opacity: 0.14, scale: 1, duration: 1.7, ease: "power2.out" },
          0,
        );

        // Eyebrow rises in first.
        tl.fromTo(
          q('[data-hero="eyebrow"]'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.1,
        );

        // Name: each letter rises from its own mask, flowing left to right.
        const title = root.querySelector<HTMLElement>('[data-hero="title"]');
        const cascadeStart = 0.25;
        const charStagger = 0.02;
        const charDuration = 0.9;
        let landTime = cascadeStart + charDuration;
        if (title) {
          split = new SplitText(title, {
            type: "lines, words, chars",
            mask: "chars",
            linesClass: "split-line",
            ignore: ".hero-dot",
          });
          landTime =
            cascadeStart + (split.chars.length - 1) * charStagger + charDuration;
          tl.from(
            split.chars,
            {
              yPercent: 120,
              duration: charDuration,
              ease: "power4.out",
              stagger: { each: charStagger, from: "start" },
            },
            cascadeStart,
          );
        }

        // Tagline, CTAs and scroll hint cascade in as the name lands.
        tl.fromTo(
          q('[data-hero="tagline"]'),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          landTime - 0.2,
        )
          .fromTo(
            q('[data-hero="cta"]'),
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            landTime - 0.05,
          )
          .fromTo(
            q('[data-hero="scroll"]'),
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" },
            landTime + 0.1,
          );

        // Accent dot pops in as the name lands; CSS drives the live pulse.
        if (title) {
          gsap.set(q(".hero-dot"), {
            scale: 0,
            opacity: 0,
            transformOrigin: "50% 50%",
          });
          tl.to(
            q(".hero-dot"),
            { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
            landTime - 0.15,
          );
        }

        // Gentle, infinite float for the scroll hint (replaces CSS bounce).
        const arrow = root.querySelector<HTMLElement>(".scroll-arrow");
        if (arrow) {
          gsap.to(arrow, {
            y: 6,
            repeat: -1,
            yoyo: true,
            duration: 0.9,
            ease: "power1.inOut",
          });
        }

        // Subtle parallax: the hero drifts up and softens as you scroll past.
        gsap.to(root, {
          yPercent: -8,
          autoAlpha: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => build());
      } else {
        build();
      }

      return () => {
        split?.revert();
      };
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <div ref={ref} className={`anim-hidden ${className ?? ""}`}>
      {children}
    </div>
  );
}
