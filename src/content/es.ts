import type { Dictionary } from "./types";

export const es: Dictionary = {
  name: "Gabriel Porras Brenes",
  nav: {
    work: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
  },
  hero: {
    eyebrow: "Ingeniero de Software Full-Stack",
    role: "Ingeniero de Software Full-Stack",
    tagline: "Software con excelencia, de la idea a la realidad.",
    ctaPrimary: "Ver proyectos",
    ctaSecondary: "Descargar CV",
    scroll: "Scroll",
  },
  about: {
    label: "Sobre mí",
    heading: "Convierto ideas en software que la gente usa.",
    body: [
      "Soy ingeniero de software full-stack. Construyo productos digitales de punta a punta, del frontend a la nube, cuidando que cada detalle funcione: rápido, seguro y bien hecho.",
      "Me mueve la excelencia. Me gusta tomar una idea, entenderla a fondo y convertirla en algo real, sin atajos ni cabos sueltos.",
    ],
  },
  projects: {
    label: "Proyectos",
    heading: "Cosas que he construido.",
    intro: "Una selección de proyectos donde uní diseño, código y propósito.",
    viewCase: "Ver caso",
    liveDemo: "Demo",
    code: "Código",
  },
  stack: {
    label: "Stack",
    heading: "Herramientas con las que trabajo.",
    groups: [
      { title: "Lenguajes", items: ["TypeScript", "Java", "C#", "C++", "SQL"] },
      { title: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind"] },
      { title: "Backend", items: ["Spring Boot", ".NET", "Node.js", "REST APIs"] },
      { title: "Nube y calidad", items: ["AWS", "Azure", "Docker", "CI/CD"] },
    ],
  },
  experience: {
    label: "Experiencia",
    heading: "Mi recorrido.",
    items: [
      {
        period: "2026",
        role: "Ing. en Software (graduado)",
        summary: "Bachillerato en Ingeniería de Software, Universidad Cenfotec.",
      },
      {
        period: "2025 — Presente",
        role: "Ingeniero de Software",
        summary:
          "Calidad y seguridad de software en proyectos a gran escala: análisis de vulnerabilidades, contenedores y pipelines de CI/CD en múltiples lenguajes.",
      },
      {
        period: "2024",
        role: "Ingeniero Full-Stack Freelance",
        summary:
          "MVP de una app móvil para un cliente de eventos: descubrimiento, invitaciones y check-ins, con APIs y autenticación segura.",
      },
    ],
    awards: [
      "3.er lugar · ExpoCenfo 2025 — MediAmigo",
      "3.er lugar · ExpoCenfo 2023 — QuitSmoke",
    ],
  },
  contact: {
    label: "Contacto",
    heading: "¿Trabajamos juntos?",
    body: "Estoy disponible para proyectos freelance. Cuéntame qué tienes en mente.",
    ctaLabel: "Escríbeme",
    availability: "Disponible para freelance",
  },
  footer: {
    builtWith: "Hecho con Next.js, Tailwind y GSAP",
    rights: "Todos los derechos reservados.",
  },
  meta: {
    title: "Gabriel Porras — Ingeniero de Software Full-Stack",
    description:
      "Ingeniero de software full-stack. Construyo productos digitales de punta a punta, con foco en calidad, seguridad y rendimiento.",
  },
};
