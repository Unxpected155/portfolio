import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { SectionNumber } from "@/components/motion/SectionNumber";
import type { Dictionary, StackGroup } from "@/content/types";

function Chip({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <li
      className={`rounded-full border px-3.5 py-1.5 font-mono text-sm leading-none ${
        accent
          ? "border-accent/40 bg-accent-soft text-text"
          : "border-border bg-surface text-muted"
      }`}
    >
      {children}
    </li>
  );
}

function Category({ group }: { group: StackGroup }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
        {group.title}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {group.items.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </ul>
    </div>
  );
}

function SecurityBlock({ group }: { group: StackGroup }) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-soft px-6 py-7 sm:px-8">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-xl font-semibold tracking-tight text-text">
          {group.title}
        </h3>
        {group.note ? (
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {group.note}
          </span>
        ) : null}
      </div>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {group.items.map((item) => (
          <Chip key={item} accent>
            {item}
          </Chip>
        ))}
      </ul>
    </div>
  );
}

export function Stack({ dict }: { dict: Dictionary }) {
  const main = dict.stack.groups.filter((group) => !group.accent);
  const security = dict.stack.groups.find((group) => group.accent);

  return (
    <section
      id="stack"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <SectionNumber value="04" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="04">{dict.stack.label}</SectionLabel>
        </Reveal>
        <SplitHeading className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.stack.heading}
        </SplitHeading>

        <Reveal
          as="div"
          stagger
          staggerDelay={0.08}
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {main.map((group) => (
            <Category key={group.title} group={group} />
          ))}
        </Reveal>

        {security ? (
          <Reveal className="mt-10">
            <SecurityBlock group={security} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
