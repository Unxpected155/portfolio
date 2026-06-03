import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary, defaultLocale } from "@/content/dictionaries";

// not-found cannot read route params, so it uses the default locale for copy.
// It still renders inside the [lang] layout (header/footer in the right language).
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-4 max-w-[16ch] font-display text-[length:var(--text-h1)] font-bold leading-[1.06] tracking-tight">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-[42ch] text-muted">{dict.notFound.body}</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-[0.95rem] font-semibold text-text transition-colors hover:border-accent hover:bg-surface-2"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {dict.notFound.cta}
      </Link>
    </section>
  );
}
