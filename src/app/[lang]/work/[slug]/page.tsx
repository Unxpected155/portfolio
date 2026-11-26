import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case/CaseStudyView";
import { getDictionary, isLang, locales } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import type { Lang } from "@/content/types";

const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    caseStudies.map((project) => ({ lang, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const typedLang: Lang = isLang(lang) ? lang : "es";
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  const t = project.i18n[typedLang];
  return {
    title: `${project.name} — ${t.tagline}`,
    description: project.caseStudy?.i18n[typedLang].summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const typedLang = lang as Lang;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();
  const dict = getDictionary(typedLang);

  return <CaseStudyView project={project} lang={typedLang} dict={dict} />;
}
