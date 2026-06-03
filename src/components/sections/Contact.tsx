import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05">{dict.contact.label}</SectionLabel>
        <h2 className="mt-4 max-w-[16ch] font-display text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.02em]">
          {dict.contact.heading}
        </h2>
        <p className="mt-6 max-w-[50ch] text-lg text-muted">{dict.contact.body}</p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Button href={`mailto:${site.email}`} external>
            {dict.contact.ctaLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
          <span className="inline-flex items-center gap-2 font-mono text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {dict.contact.availability}
          </span>
        </div>
      </div>
    </section>
  );
}
