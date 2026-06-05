import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { CardsReveal } from "@/components/motion/CardsReveal";
import { SectionNumber } from "@/components/motion/SectionNumber";
import { featuredProjects } from "@/content/projects";
import type { Dictionary, Lang } from "@/content/types";

export function Projects({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const [lead, ...rest] = featuredProjects;

  return (
    <section
      id="work"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:py-32"
    >
      <SectionNumber value="02" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="02">{dict.projects.label}</SectionLabel>
        </Reveal>
        <SplitHeading className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.projects.heading}
        </SplitHeading>
        <Reveal as="p" className="mt-4 max-w-[55ch] text-muted">
          {dict.projects.intro}
        </Reveal>

        <CardsReveal className="mt-12 flex flex-col gap-6">
          {lead ? (
            <ProjectCard
              project={lead}
              index={0}
              lang={lang}
              dict={dict}
              featured
            />
          ) : null}
          {rest.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index + 1}
                  lang={lang}
                  dict={dict}
                />
              ))}
            </div>
          ) : null}
        </CardsReveal>
      </div>
    </section>
  );
}
