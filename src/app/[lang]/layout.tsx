import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { BackgroundFX } from "@/components/motion/BackgroundFX";
import { BackToTop } from "@/components/motion/BackToTop";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { RouteFrame } from "@/components/motion/RouteFrame";
import { getDictionary, isLang, locales } from "@/content/dictionaries";
import type { Lang } from "@/content/types";

const generalSans = localFont({
  src: [
    { path: "../../fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display-family",
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
      className={`${generalSans.variable} ${hanken.variable} ${GeistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <noscript>
          <style
            dangerouslySetInnerHTML={{ __html: ".anim-hidden{opacity:1}" }}
          />
        </noscript>
        <a href="#main-content" className="skip-link">
          {dict.a11y.skipToContent}
        </a>
        <BackgroundFX />
        <SmoothScroll />
        <Cursor />
        <TransitionProvider>
          <Header lang={typedLang} dict={dict} />
          <main id="main-content" className="flex-1">
            <RouteFrame>{children}</RouteFrame>
          </main>
          <Footer dict={dict} />
          <BackToTop label={dict.a11y.backToTop} />
        </TransitionProvider>
      </body>
    </html>
  );
}
