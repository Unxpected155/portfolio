import type { Dictionary } from "./types";

export const en: Dictionary = {
  name: "Gabriel Porras Brenes",
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Full-Stack Software Engineer",
    role: "Full-Stack Software Engineer",
    tagline: "Software with excellence, from idea to reality.",
    ctaPrimary: "View work",
    ctaSecondary: "Download CV",
    scroll: "Scroll",
  },
  about: {
    label: "About",
    heading: "I turn ideas into software people use.",
    body: [
      "I'm a full-stack software engineer. I build digital products end to end, from the frontend to the cloud, making sure every detail works: fast, secure, and well crafted.",
      "Excellence is what drives me. I take an idea, understand it deeply, and turn it into something real, with no shortcuts and no loose ends.",
    ],
  },
  projects: {
    label: "Work",
    heading: "Things I've built.",
    intro: "A selection of projects where I brought design, code, and purpose together.",
    viewCase: "View case study",
    liveDemo: "Live demo",
    code: "Code",
  },
  stack: {
    label: "Stack",
    heading: "Tools I work with.",
    groups: [
      { title: "Languages", items: ["TypeScript", "Java", "C#", "C++", "SQL"] },
      { title: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind"] },
      { title: "Backend", items: ["Spring Boot", ".NET", "Node.js", "REST APIs"] },
      { title: "Cloud & quality", items: ["AWS", "Azure", "Docker", "CI/CD"] },
    ],
  },
  experience: {
    label: "Experience",
    heading: "My path so far.",
    items: [
      {
        period: "2026",
        role: "B.Sc. Software Engineering (graduated)",
        summary: "B.Sc. in Software Engineering, Universidad Cenfotec.",
      },
      {
        period: "2025 — Present",
        role: "Software Engineer",
        summary:
          "Software quality and security on large-scale projects: vulnerability analysis, containers, and CI/CD pipelines across multiple languages.",
      },
      {
        period: "2024",
        role: "Freelance Full-Stack Engineer",
        summary:
          "Mobile app MVP for an events client: discovery, invitations, and check-ins, with APIs and secure authentication.",
      },
    ],
    awards: [
      "3rd place · ExpoCenfo 2025 — MediAmigo",
      "3rd place · ExpoCenfo 2023 — QuitSmoke",
    ],
  },
  contact: {
    label: "Contact",
    heading: "Let's work together.",
    body: "I'm available for freelance projects. Tell me what you have in mind.",
    ctaLabel: "Get in touch",
    availability: "Available for freelance",
    copy: "Copy",
    copied: "Copied!",
  },
  footer: {
    builtWith: "Built with Next.js, Tailwind & GSAP",
    rights: "All rights reserved.",
  },
  meta: {
    title: "Gabriel Porras — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer. I build digital products end to end, with a focus on quality, security, and performance.",
  },
  a11y: {
    skipToContent: "Skip to content",
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or was moved.",
    cta: "Back to home",
  },
};
