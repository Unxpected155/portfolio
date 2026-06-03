import { Mail } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold">
            {dict.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            © {year} · {dict.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail className="size-5" aria-hidden="true" />
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>

        <p className="font-mono text-xs text-faint">{dict.footer.builtWith}</p>
      </div>
    </footer>
  );
}
