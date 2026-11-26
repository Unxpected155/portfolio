import type { Lang } from "./types";

export type ProjectI18n = {
  tagline: string;
  description: string;
  role: string;
  award?: string;
};

export type CaseStudyFeature = { title: string; body: string };

export type CaseStudyImage = {
  src: string;
  alt: Record<Lang, string>;
  /** CSS object-position for the tile (defaults to center). */
  position?: string;
};

export type CaseStudyI18n = {
  summary: string;
  challenge: string[];
  features: CaseStudyFeature[];
};

export type CaseStudy = {
  /** Keys a project-specific diagram component in the case-study view. */
  flow?: "mediamigo";
  images: CaseStudyImage[];
  i18n: Record<Lang, CaseStudyI18n>;
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
  caseStudy?: CaseStudy;
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
      // El sitio en vivo está caído; se reactivará el enlace cuando vuelva a estar en línea.
      // live: "https://www.dkolorpainting.com",
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
    tags: ["Python", "Flask", "OpenAI", "Azure", "Twilio", "ESP32 / C++"],
    image: "/images/projects/mediamigo/cover.webp",
    imagePosition: "center 15%",
    links: {
      repo: "https://github.com/kendra-svg/rocketduo-expocenfo-25",
    },
    i18n: {
      es: {
        tagline: "Un asistente para el cuidado de adultos mayores",
        description:
          "Un familiar escribe en lenguaje natural (“mi abuela toma aspirina a las 6 p.m.”) y la IA lo convierte en un recordatorio estructurado que un dispositivo ESP32 reproduce en voz a la hora indicada. Suma botón de emergencia que avisa al cuidador por SMS y alertas según el clima.",
        role: "Equipo RocketDuo · Integraciones y lógica de recordatorios",
        award: "3.er lugar · ExpoCenfo 2025",
      },
      en: {
        tagline: "An assistant for elderly care",
        description:
          "A family member writes in plain language (“grandma takes aspirin at 6 p.m.”) and the AI turns it into a structured reminder that an ESP32 device reads aloud at the right time. It adds an emergency button that alerts the caregiver by SMS and weather-based alerts.",
        role: "RocketDuo team · Integrations and reminder logic",
        award: "3rd place · ExpoCenfo 2025",
      },
    },
    caseStudy: {
      flow: "mediamigo",
      images: [
        {
          src: "/images/projects/mediamigo/circuito-3.webp",
          position: "center 30%",
          alt: {
            es: "Montaje completo del dispositivo dentro de su carcasa",
            en: "The full device assembled inside its enclosure",
          },
        },
        {
          src: "/images/projects/mediamigo/circuito-1.webp",
          alt: {
            es: "Protoboard con LEDs, botones y buzzer del prototipo",
            en: "Breadboard with the prototype's LEDs, buttons and buzzer",
          },
        },
        {
          src: "/images/projects/mediamigo/circuito-2.webp",
          alt: {
            es: "Placa ESP32 que ejecuta y reproduce los recordatorios",
            en: "ESP32 board that runs and plays the reminders",
          },
        },
      ],
      i18n: {
        es: {
          summary:
            "MediAmigo convierte una frase en lenguaje natural en un recordatorio de medicación que un dispositivo ESP32 reproduce en voz a la hora exacta, para que un adulto mayor no dependa de recordarlo por su cuenta ni de la presencia constante de un cuidador.",
          challenge: [
            "Las personas mayores que viven solas suelen olvidar sus medicamentos, lo que deriva en complicaciones y hospitalizaciones evitables. Las soluciones existentes piden conectividad constante, interfaces complejas o suscripciones: nada amigable para este grupo.",
            "La meta fue reducir al mínimo la interacción del adulto mayor. El cuidador escribe en lenguaje natural (“mi abuela toma enalapril a las 8 a.m.”) y el sistema se encarga del resto: estructura la indicación con IA, la convierte en voz y la reproduce en el dispositivo a la hora indicada.",
          ],
          features: [
            {
              title: "Lenguaje natural → recordatorio estructurado",
              body: "Una frase como “mi abuela toma aspirina a las 6 p.m.” se procesa con GPT-3.5 y se convierte en un JSON con hora, medicamento y mensaje.",
            },
            {
              title: "Voz natural en español",
              body: "Azure Text-to-Speech genera un audio con voz clara y humanizada que el dispositivo reproduce a la hora exacta.",
            },
            {
              title: "Dispositivo ESP32 con LEDs y buzzer",
              body: "El ESP32 descarga la configuración y acompaña cada recordatorio con audio por altavoz y señales visuales y sonoras.",
            },
            {
              title: "Botones de estado y emergencia",
              body: "Tres botones (emergencia, tristeza, hambre). El de emergencia envía un SMS al cuidador mediante Twilio.",
            },
            {
              title: "Alertas según el clima",
              body: "Un sensor de temperatura dispara mensajes según el ambiente, como abrigarse o hidratarse.",
            },
            {
              title: "Claves de API protegidas",
              body: "Las credenciales se manejan con variables de entorno, fuera del repositorio.",
            },
          ],
        },
        en: {
          summary:
            "MediAmigo turns a plain-language sentence into a medication reminder that an ESP32 device reads aloud at the exact time, so an older adult doesn't have to remember it alone or depend on a caregiver being present.",
          challenge: [
            "Older adults who live alone often forget their medication, which leads to avoidable complications and hospitalizations. Existing solutions demand constant connectivity, complex interfaces, or subscriptions: none of them friendly for this group.",
            "The goal was to minimize how much the older adult has to interact. The caregiver writes in plain language (“grandma takes enalapril at 8 a.m.”) and the system handles the rest: it structures the instruction with AI, turns it into speech, and plays it on the device at the right time.",
          ],
          features: [
            {
              title: "Natural language → structured reminder",
              body: "A sentence like “grandma takes aspirin at 6 p.m.” is processed with GPT-3.5 and turned into JSON with time, medication, and message.",
            },
            {
              title: "Natural Spanish voice",
              body: "Azure Text-to-Speech generates clear, human-sounding audio that the device plays back at the exact time.",
            },
            {
              title: "ESP32 device with LEDs and buzzer",
              body: "The ESP32 downloads the configuration and pairs each reminder with speaker audio plus visual and sound cues.",
            },
            {
              title: "Status and emergency buttons",
              body: "Three buttons (emergency, sadness, hunger). The emergency one sends an SMS to the caregiver through Twilio.",
            },
            {
              title: "Weather-based alerts",
              body: "A temperature sensor triggers environment-aware messages, like dressing warmly or staying hydrated.",
            },
            {
              title: "Protected API keys",
              body: "Credentials are handled with environment variables, kept out of the repository.",
            },
          ],
        },
      },
    },
  },
  {
    slug: "quitsmoke",
    name: "QuitSmoke",
    year: "2023",
    featured: true,
    tags: ["Spring Boot", "Angular", "Spring Security", "JWT", "AWS EC2", "Arduino"],
    links: {},
    i18n: {
      es: {
        tagline: "App conectada para dejar de fumar",
        description:
          "Aplicación web con hardware conectado para acompañar a quienes quieren dejar de fumar, con autenticación segura (Spring Security + JWT) y backend desplegado en AWS EC2.",
        role: "Proyecto en equipo · Desarrollo full-stack",
        award: "3.er lugar · ExpoCenfo 2023",
      },
      en: {
        tagline: "A connected app to quit smoking",
        description:
          "A web app with connected hardware to support people quitting smoking, with secure authentication (Spring Security + JWT) and a backend deployed on AWS EC2.",
        role: "Team project · Full-stack development",
        award: "3rd place · ExpoCenfo 2023",
      },
    },
  },
];

// Featured projects, most recent first (keeps the section in chronological order).
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => Number(b.year) - Number(a.year));
