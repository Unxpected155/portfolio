import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/content/types";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01">{dict.about.label}</SectionLabel>
        <h2 className="mt-4 max-w-[20ch] font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.about.heading}
        </h2>
        <div className="mt-8 max-w-[65ch] space-y-5 text-lg text-muted">
          {dict.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
