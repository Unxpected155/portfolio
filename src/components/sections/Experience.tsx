import { Trophy } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { SectionNumber } from "@/components/motion/SectionNumber";
import type { Dictionary } from "@/content/types";

export function Experience({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <SectionNumber value="04" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="04">{dict.experience.label}</SectionLabel>
        </Reveal>
        <SplitHeading className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.experience.heading}
        </SplitHeading>

        <Reveal as="ol" stagger className="mt-12 border-l border-border">
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

        <Reveal as="ul" stagger className="mt-10 flex flex-wrap gap-3">
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
