import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { getDictionary, isLang } from "@/content/dictionaries";
import type { Lang } from "@/content/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const typedLang = lang as Lang;
  const dict = getDictionary(typedLang);

  return (
    <>
      <Hero lang={typedLang} dict={dict} />
      <About dict={dict} />
      <Projects lang={typedLang} dict={dict} />
      <Experience dict={dict} />
      <Stack dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
