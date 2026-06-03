export type Lang = "es" | "en";

export type NavCopy = {
  work: string;
  about: string;
  contact: string;
};

export type HeroCopy = {
  eyebrow: string;
  role: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scroll: string;
};

export type AboutCopy = {
  label: string;
  heading: string;
  body: string[];
};

export type ProjectsCopy = {
  label: string;
  heading: string;
  intro: string;
  viewCase: string;
  liveDemo: string;
  code: string;
};

export type StackGroup = {
  title: string;
  items: string[];
};

export type StackCopy = {
  label: string;
  heading: string;
  groups: StackGroup[];
};

export type ExperienceItem = {
  period: string;
  role: string;
  summary: string;
};

export type ExperienceCopy = {
  label: string;
  heading: string;
  items: ExperienceItem[];
  awards: string[];
};

export type ContactCopy = {
  label: string;
  heading: string;
  body: string;
  ctaLabel: string;
  availability: string;
  copy: string;
  copied: string;
};

export type A11yCopy = {
  skipToContent: string;
  backToTop: string;
  openMenu: string;
  closeMenu: string;
};

export type NotFoundCopy = {
  title: string;
  body: string;
  cta: string;
};

export type FooterCopy = {
  builtWith: string;
  rights: string;
};

export type MetaCopy = {
  title: string;
  description: string;
};

export type Dictionary = {
  name: string;
  nav: NavCopy;
  hero: HeroCopy;
  about: AboutCopy;
  projects: ProjectsCopy;
  stack: StackCopy;
  experience: ExperienceCopy;
  contact: ContactCopy;
  footer: FooterCopy;
  meta: MetaCopy;
  a11y: A11yCopy;
  notFound: NotFoundCopy;
};
