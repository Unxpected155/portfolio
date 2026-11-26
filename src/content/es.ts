import type { Dictionary } from "./types";

export const es: Dictionary = {
  name: "Gabriel Porras Brenes",
  nav: {
    work: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
  },
  hero: {
    eyebrow: "Ingeniero de Software · Seguridad de Aplicaciones",
    role: "Ingeniero de Software · Seguridad de Aplicaciones",
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
    liveDemo: "Ver sitio",
    code: "Código",
  },
  stack: {
    label: "Stack",
    heading: "Herramientas con las que trabajo.",
    groups: [
      { title: "Lenguajes", items: ["TypeScript", "JavaScript", "Java", "SQL"] },
      { title: "Frontend", items: ["React", "Next.js", "Tailwind"] },
      { title: "Backend", items: ["Node.js", "Spring Boot", "REST APIs"] },
      { title: "DevOps", items: ["Docker", "Git/GitHub", "CI/CD"] },
      {
        title: "Seguridad",
        note: "SAST · SCA · contenedores",
        accent: true,
        items: [
          "Snyk",
          "SonarQube",
          "Apiiro",
          "Spring Security",
          "JWT",
          "TLS",
          "CI/CD seguro",
        ],
      },
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
        role: "Ingeniero Full Stack · Hardening de Aplicaciones (AppSec) — Babel",
        summary:
          "Seguridad de aplicaciones en software empresarial a gran escala. Remedié más de 1,000 vulnerabilidades (SAST/SCA) en ~50 aplicaciones y servicios, principalmente en Node.js, e integré security gates en 15 pipelines de CI/CD que bloquean builds vulnerables antes de producción. Me apoyo en Kubernetes, Grafana y OpenAPI para orquestación, observabilidad y documentación de APIs.",
      },
      {
        period: "2024",
        role: "Ingeniero Full-Stack Freelance",
        summary:
          "MVP móvil de punta a punta para un cliente de eventos (descubrimiento, invitaciones y check-ins), con APIs REST, autenticación segura y mapas. Ciclos de diseño, iteración y validación directo con el cliente.",
      },
    ],
    awards: [
      "3.er lugar · ExpoCenfo 2025 — MediAmigo",
      "3.er lugar · ExpoCenfo 2023 — QuitSmoke",
    ],
  },
  contact: {
    label: "Contacto",
    heading: "Trabajemos",
    headingAccent: "juntos",
    body: "Estoy disponible para proyectos freelance. Cuéntame qué tienes en mente.",
    ctaLabel: "Escríbeme",
    availability: "Disponible para freelance",
    copy: "Copiar",
    copied: "¡Copiado!",
  },
  footer: {
    builtWith: "Hecho con Next.js, Tailwind y GSAP",
    rights: "Todos los derechos reservados.",
  },
  meta: {
    title: "Gabriel Porras — Ingeniero de Software · Seguridad de Aplicaciones",
    description:
      "Ingeniero de software enfocado en seguridad de aplicaciones (AppSec). Construyo y aseguro productos de punta a punta, con foco en calidad y rendimiento.",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    backToTop: "Volver arriba",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que buscas no existe o fue movida.",
    cta: "Volver al inicio",
  },
  caseStudy: {
    back: "Proyectos",
    challenge: "El reto",
    howItWorks: "Cómo funciona",
    flowNote: "De una frase escrita a un recordatorio en voz, de punta a punta.",
    features: "Qué hace",
    gallery: "El dispositivo",
    details: "Detalles",
    role: "Rol",
    year: "Año",
    recognition: "Reconocimiento",
    stack: "Stack",
    repo: "Ver repositorio",
  },
};
