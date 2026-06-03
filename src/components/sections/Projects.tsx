import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects } from "@/content/projects";
import type { Dictionary, Lang } from "@/content/types";

export function Projects({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02">{dict.projects.label}</SectionLabel>
        <h2 className="mt-4 font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
          {dict.projects.heading}
        </h2>
        <p className="mt-4 max-w-[55ch] text-muted">{dict.projects.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              lang={lang}
              dict={dict}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
