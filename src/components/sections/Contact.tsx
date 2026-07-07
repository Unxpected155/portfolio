import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WordHeading } from "@/components/motion/WordHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SectionNumber } from "@/components/motion/SectionNumber";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <SectionNumber value="05" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="05">{dict.contact.label}</SectionLabel>
        </Reveal>
        <WordHeading className="mt-4 max-w-[16ch] font-display text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.02em]">
          {dict.contact.heading}
        </WordHeading>
        <Reveal as="p" className="mt-6 max-w-[50ch] text-lg text-muted">
          {dict.contact.body}
        </Reveal>

        <Reveal className="mt-9 flex flex-wrap items-center gap-5">
          <Magnetic>
            <Button href={`mailto:${site.email}`} external>
              {dict.contact.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </Magnetic>
          <span className="inline-flex items-center gap-2 font-mono text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {dict.contact.availability}
          </span>
        </Reveal>

        <Reveal as="div" className="mt-6">
          <CopyEmail
            email={site.email}
            copyLabel={dict.contact.copy}
            copiedLabel={dict.contact.copied}
          />
        </Reveal>
      </div>
    </section>
  );
}
