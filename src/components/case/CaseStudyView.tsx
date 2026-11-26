import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Dictionary, Lang } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { GithubIcon } from "@/components/ui/icons";
import { MediAmigoFlow } from "./MediAmigoFlow";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
      {children}
    </h2>
  );
}

export function CaseStudyView({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Lang;
  dict: Dictionary;
}) {
  const cs = project.caseStudy;
  if (!cs) return null;
  const t = project.i18n[lang];
  const c = cs.i18n[lang];
  const copy = dict.caseStudy;

  return (
    <article className="px-6 pb-28 pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Reveal>
          <Link
            href={`/${lang}#work`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-text"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </Link>
        </Reveal>

        {/* Title + summary */}
        <Reveal
          as="h1"
          className="mt-8 font-display text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.025em]"
        >
          {project.name}
        </Reveal>
        <Reveal as="p" className="mt-5 max-w-[60ch] text-lg text-muted sm:text-xl">
          {c.summary}
        </Reveal>

        {/* Meta */}
        <Reveal
          as="dl"
          stagger
          staggerDelay={0.06}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4"
        >
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
              {copy.year}
            </dt>
            <dd className="mt-2 text-sm text-text">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
              {copy.role}
            </dt>
            <dd className="mt-2 text-sm text-text">{t.role}</dd>
          </div>
          {t.award ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                {copy.recognition}
              </dt>
              <dd className="mt-2 text-sm text-text">{t.award}</dd>
            </div>
          ) : null}
          {project.links.repo ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                {copy.repo}
              </dt>
              <dd className="mt-2">
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </dd>
            </div>
          ) : null}
        </Reveal>

        {/* Challenge */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading>{copy.challenge}</SectionHeading>
          </Reveal>
          <Reveal as="div" stagger staggerDelay={0.08} className="mt-6 space-y-5">
            {c.challenge.map((p, i) => (
              <p key={i} className="max-w-[65ch] text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </section>

        {/* How it works (flow diagram) */}
        {cs.flow === "mediamigo" ? (
          <section className="mt-20">
            <Reveal>
              <SectionHeading>{copy.howItWorks}</SectionHeading>
            </Reveal>
            <Reveal as="p" className="mt-3 max-w-[55ch] text-muted">
              {copy.flowNote}
            </Reveal>
            <Reveal className="mt-8">
              <MediAmigoFlow lang={lang} />
            </Reveal>
          </section>
        ) : null}

        {/* Features */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading>{copy.features}</SectionHeading>
          </Reveal>
          <Reveal
            as="ul"
            stagger
            staggerDelay={0.06}
            className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2"
          >
            {c.features.map((f, i) => (
              <li key={f.title}>
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-text">
                  {f.title}
                </h3>
                <p className="mt-2 max-w-[48ch] text-sm text-muted">{f.body}</p>
              </li>
            ))}
          </Reveal>
        </section>

        {/* Gallery */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading>{copy.gallery}</SectionHeading>
          </Reveal>
          <Reveal
            as="div"
            stagger
            staggerDelay={0.08}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cs.images.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-surface"
              >
                <Image
                  src={img.src}
                  alt={img.alt[lang]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  style={img.position ? { objectPosition: img.position } : undefined}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </Reveal>
        </section>

        {/* Stack */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading>{copy.stack}</SectionHeading>
          </Reveal>
          <Reveal as="ul" stagger staggerDelay={0.04} className="mt-6 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </Reveal>
        </section>

        {/* Back to work (foot) */}
        <Reveal className="mt-20 border-t border-border pt-8">
          <Link
            href={`/${lang}#work`}
            className="inline-flex items-center gap-2 font-medium text-text transition-colors hover:text-accent"
          >
            {copy.back}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
