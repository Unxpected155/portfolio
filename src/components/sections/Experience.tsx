"use client";

import { useRef } from "react";
import { Trophy } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { SectionNumber } from "@/components/motion/SectionNumber";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Dictionary } from "@/content/types";

function TimelineList({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const line = ref.current?.querySelector<HTMLElement>("[data-timeline-line]");
      if (!line || reduced) return;
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <div ref={ref} className="relative mt-12">
      <div
        data-timeline-line
        className="absolute left-0 top-0 h-full w-px bg-border"
        aria-hidden="true"
      />
      <Reveal as="ol" stagger staggerDelay={0.12}>
        {dict.experience.items.map((item) => (
          <li
            key={`${item.period}-${item.role}`}
            className="relative pb-10 pl-8 last:pb-0"
          >
            <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
              {item.period}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold">
              {item.role}
            </h3>
            <p className="mt-2 max-w-[60ch] text-muted">{item.summary}</p>
          </li>
        ))}
      </Reveal>
    </div>
  );
}

export function Experience({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <SectionNumber value="03" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="03">{dict.experience.label}</SectionLabel>
        </Reveal>
        <SplitHeading className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.experience.heading}
        </SplitHeading>

        <TimelineList dict={dict} />

        <Reveal as="ul" stagger staggerDelay={0.05} className="mt-10 flex flex-wrap gap-3">
          {dict.experience.awards.map((award) => (
            <li
              key={award}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
            >
              <Trophy className="size-4 text-accent" aria-hidden="true" />
              {award}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
