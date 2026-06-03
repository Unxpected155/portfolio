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
  links: {
    live?: string;
    repo?: string;
    repoBackend?: string;
  };
  i18n: Record<Lang, ProjectI18n>;
};

export const projects: Project[] = [
  {
    slug: "game-hub",
    name: "Game Hub",
    year: "2023",
    featured: true,
    tags: ["React", "TypeScript", "Vite", "Chakra UI"],
    image: "/images/projects/game-hub/cover.png",
    links: {
      live: "https://game-hub-ruby-gamma.vercel.app",
      repo: "https://github.com/Unxpected155/gameHub",
    },
    i18n: {
      es: {
        tagline: "Explorador de videojuegos con búsqueda y filtros en tiempo real",
        description:
          "Una app para descubrir videojuegos: busca, filtra por género y plataforma, y encuentra tu próximo título en segundos.",
        role: "Desarrollo frontend",
      },
      en: {
        tagline: "A game-discovery app with live search and filtering",
        description:
          "An app to discover video games: search, filter by genre and platform, and find your next title in seconds.",
        role: "Frontend development",
      },
    },
  },
  {
    slug: "quit-smoke",
    name: "QuitSmoke",
    year: "2023",
    featured: true,
    tags: ["Spring Boot", "Angular", "AWS", "C++"],
    image: "/images/projects/quit-smoke/cover.png",
    links: {
      live: "https://quitsmoke.netlify.app",
      repo: "https://github.com/Unxpected155/QuitSmoke-FrontEnd",
      repoBackend: "https://github.com/Unxpected155/QuitSmoke-Backend",
    },
    i18n: {
      es: {
        tagline: "Un ecosistema para dejar de fumar",
        description:
          "Combina comunidad, recompensas y un wearable que mide tu exposición real al monóxido de carbono para acompañarte en el camino.",
        role: "Desarrollo full-stack (equipo)",
        award: "3.er lugar · ExpoCenfo 2023",
      },
      en: {
        tagline: "A quit-smoking ecosystem",
        description:
          "It blends community, rewards, and a wearable that measures your real carbon-monoxide exposure to support you along the way.",
        role: "Full-stack development (team)",
        award: "3rd place · ExpoCenfo 2023",
      },
    },
  },
  {
    slug: "mediamigo",
    name: "MediAmigo",
    year: "2025",
    featured: true,
    tags: ["ESP32", "Python", "Flask", "Azure", "OpenAI"],
    image: "/images/projects/mediamigo/cover.png",
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
