import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Dictionary, Lang } from "@/content/types";
import { Tag } from "./Tag";
import { GithubIcon } from "./icons";

const gradients = [
  "from-[#1b2a4a] to-[#2563eb]",
  "from-[#14233f] to-[#3b74f0]",
  "from-[#101826] to-[#1d3b6b]",
];

export function ProjectCard({
  project,
  index,
  lang,
  dict,
}: {
  project: Project;
  index: number;
  lang: Lang;
  dict: Dictionary;
}) {
  const t = project.i18n[lang];
  const gradient = gradients[index % gradients.length];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 ease-out hover:border-accent">
      <div className="relative h-44 overflow-hidden sm:h-52">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 ease-out group-hover:scale-105`}
        />
        {t.award ? (
          <span className="absolute left-4 top-4 rounded-full bg-bg/70 px-3 py-1 font-mono text-xs text-text backdrop-blur-sm">
            {t.award}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          {String(index + 1).padStart(2, "0")} — {project.year}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-muted">{t.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5 pt-2 text-sm">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 font-medium text-text transition-colors hover:text-accent"
            >
              {dict.projects.liveDemo}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          {project.links.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-accent"
            >
              <GithubIcon className="size-4" />
              {dict.projects.code}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
