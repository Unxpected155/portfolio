"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Contact heading: a smaller lead ("Let's work") reveals word by word, then the
 * accent word ("together.") reveals letter by letter in sequence, larger and in
 * the highlight color. Reduced-motion users get the static styled heading.
 */
export function ContactHeading({
  lead,
  accent,
  className,
}: {
  lead: string;
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const leadEl = el.querySelector<HTMLElement>(".ch-lead");
      const accentEl = el.querySelector<HTMLElement>(".ch-accent");

      let splitLead: InstanceType<typeof SplitText> | undefined;
      let splitAccent: InstanceType<typeof SplitText> | undefined;

      const run = () => {
        // Split the lead into words and the accent into characters, then reveal
        // ALL units (Let's, work, T, O, G, E, T, H, E, R...) in one continuous
        // cascade with the same rhythm. The only difference is that the accent
        // word comes out letter by letter instead of as a whole word.
        const targets: Element[] = [];

        if (leadEl) {
          splitLead = new SplitText(leadEl, {
            type: "words",
            mask: "words",
            wordsClass: "mask-unit",
          });
          targets.push(...splitLead.words);
        }
        if (accentEl) {
          splitAccent = new SplitText(accentEl, {
            type: "chars",
            mask: "chars",
            charsClass: "mask-unit",
          });
          targets.push(...splitAccent.chars);
        }

        gsap.from(targets, {
          yPercent: 110,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      };

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        splitLead?.revert();
        splitAccent?.revert();
      };
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <h2 ref={ref} className={className}>
      <span className="ch-lead text-[0.72em]">{lead}</span>{" "}
      <span className="ch-accent whitespace-nowrap text-highlight uppercase">
        {accent}
      </span>
    </h2>
  );
}
