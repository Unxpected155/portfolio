import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import type { Dictionary } from "@/content/types";

export function Stack({ dict }: { dict: Dictionary }) {
  return (
    <section className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">{dict.stack.label}</SectionLabel>
        <h2 className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.stack.heading}
        </h2>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.stack.groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
