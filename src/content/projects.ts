import type { Lang } from "./types";

export type ProjectI18n = {
  tagline: string;
  description: string;
  role: string;
  award?: string;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  featured: boolean;
  tags: string[];
  image?: string;
  /** CSS object-position for the cover image (defaults to center). */
  imagePosition?: string;
  links: {
    live?: string;
    repo?: string;
    repoBackend?: string;
  };
  i18n: Record<Lang, ProjectI18n>;
};

export const projects: Project[] = [
  {
    slug: "dkolor",
    name: "D'Kolor",
    year: "2026",
    featured: true,
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    image: "/images/projects/dkolor/cover.jpg",
    links: {
      live: "https://www.dkolorpainting.com",
    },
    i18n: {
      es: {
        tagline:
          "Landing de alta conversión para una empresa de pintura y remodelación",
        description:
          "Sitio de una página para captar clientes: comparador interactivo antes/después, servicios con fotos, formulario validado y contacto directo por WhatsApp. Bilingüe y pensado primero para móvil.",
        role: "Freelance · Diseño y desarrollo frontend",
      },
      en: {
        tagline:
          "A high-conversion landing page for a painting & remodeling company",
        description:
          "A one-page site built to win clients: an interactive before/after slider, photo-rich services, a validated contact form, and direct WhatsApp contact. Bilingual and mobile-first.",
        role: "Freelance · Design & frontend development",
      },
    },
  },
  {
    slug: "mediamigo",
    name: "MediAmigo",
    year: "2025",
    featured: true,
    tags: ["ESP32", "Python", "Flask", "Azure", "OpenAI"],
    image: "/images/projects/mediamigo/cover.webp",
    imagePosition: "center 15%",
    links: {
      repo: "https://github.com/kendra-svg/rocketduo-expocenfo-25",
    },
    i18n: {
      es: {
        tagline: "Un asistente para el cuidado de adultos mayores",
        description:
          "Acompaña a las personas mayores con sus medicamentos: recordatorios por voz, alertas según el clima y un botón de emergencia que avisa a su cuidador.",
        role: "Integraciones y lógica de recordatorios (equipo)",
        award: "3.er lugar · ExpoCenfo 2025",
      },
      en: {
        tagline: "An assistant for elderly care",
        description:
          "It helps older adults with their medication: voice reminders, weather-based alerts, and an emergency button that notifies their caregiver.",
        role: "Integrations and reminder logic (team)",
        award: "3rd place · ExpoCenfo 2025",
      },
    },
  },
];

// Featured projects, most recent first (keeps the section in chronological order).
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => Number(b.year) - Number(a.year));
