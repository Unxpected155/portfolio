import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Marquee } from "@/components/motion/Marquee";
import { SectionNumber } from "@/components/motion/SectionNumber";
import type { Dictionary } from "@/content/types";

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item}
          className="mx-6 inline-flex items-center gap-6 font-display text-xl font-semibold tracking-tight text-text sm:text-2xl"
        >
          {item}
          <span
            className="size-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
        </span>
      ))}
    </>
  );
}

export function Stack({ dict }: { dict: Dictionary }) {
  const all = dict.stack.groups.flatMap((group) => group.items);
  const mid = Math.ceil(all.length / 2);
  const rowA = all.slice(0, mid);
  const rowB = all.slice(mid);

  return (
    <section
      id="stack"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <SectionNumber value="04" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="04">{dict.stack.label}</SectionLabel>
        </Reveal>
        <SplitHeading className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.stack.heading}
        </SplitHeading>
      </div>

      <div className="relative z-10 mt-12 flex flex-col gap-4">
        <Marquee direction={1} speed={50}>
          <Row items={rowA} />
        </Marquee>
        <Marquee direction={-1} speed={50}>
          <Row items={rowB} />
        </Marquee>
      </div>
    </section>
  );
}
