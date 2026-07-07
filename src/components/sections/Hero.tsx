import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import type { Dictionary, Lang } from "@/content/types";
import { site } from "@/lib/site";

export function Hero({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6 pt-28">
      <HeroReveal>
        <div data-hero="glow" className="hero-glow" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p
            data-hero="eyebrow"
            className="font-mono text-sm uppercase tracking-[0.18em] text-faint"
          >
            {dict.hero.eyebrow}
          </p>

          <h1
            data-hero="title"
            className="mt-6 font-display text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.025em]"
          >
            {dict.name.split(" ").slice(0, 2).join(" ")}
            <br />
            {dict.name.split(" ").slice(2).join(" ")}
            <span className="hero-dot" aria-hidden="true">
              <span className="hero-dot__ping" />
              <span className="hero-dot__core" />
            </span>
          </h1>

          <p
            data-hero="tagline"
            className="mt-6 max-w-[48ch] text-lg text-muted sm:text-xl"
          >
            {dict.hero.tagline}
          </p>

          <div data-hero="cta" className="mt-9 flex flex-wrap gap-3.5">
            <Magnetic strength={0.4}>
              <Button href="#work">{dict.hero.ctaPrimary}</Button>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Button href={site.cv[lang]} variant="ghost" external>
                {dict.hero.ctaSecondary}
              </Button>
            </Magnetic>
          </div>
        </div>

        <a
          data-hero="scroll"
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.2em] text-faint transition-colors hover:text-text"
        >
          <ArrowDown className="scroll-arrow mx-auto mb-1 size-4" aria-hidden="true" />
          {dict.hero.scroll}
        </a>
      </HeroReveal>
    </section>
  );
}
