import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { SectionNumber } from "@/components/motion/SectionNumber";
import type { Dictionary } from "@/content/types";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <SectionNumber value="01" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="01">{dict.about.label}</SectionLabel>
        </Reveal>
        <SplitHeading className="mt-4 max-w-[20ch] font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.about.heading}
        </SplitHeading>
        <Reveal
          as="div"
          stagger
          staggerDelay={0.12}
          className="mt-8 max-w-[65ch] space-y-5 text-lg text-muted"
        >
          {dict.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
