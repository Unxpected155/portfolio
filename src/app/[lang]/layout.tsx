import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { BackgroundFX } from "@/components/motion/BackgroundFX";
import { getDictionary, isLang, locales } from "@/content/dictionaries";
import type { Lang } from "@/content/types";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLang(lang) ? lang : "es");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: { es: "/es", en: "/en" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const typedLang = lang as Lang;
  const dict = getDictionary(typedLang);

  return (
    <html
      lang={typedLang}
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${hanken.variable} ${GeistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <noscript>
          <style
            dangerouslySetInnerHTML={{ __html: ".anim-hidden{opacity:1}" }}
          />
        </noscript>
        <BackgroundFX />
        <SmoothScroll />
        <Cursor />
        <Header lang={typedLang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
