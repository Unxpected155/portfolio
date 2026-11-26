import { Fragment } from "react";
import {
  MessageSquareText,
  Sparkles,
  Volume2,
  Database,
  Cpu,
  ChevronRight,
  Siren,
  Thermometer,
} from "lucide-react";
import type { Lang } from "@/content/types";

type Step = {
  icon: typeof MessageSquareText;
  label: Record<Lang, string>;
  tech: string;
  accent?: boolean;
};

const steps: Step[] = [
  {
    icon: MessageSquareText,
    label: { es: "Frase", en: "Sentence" },
    tech: "Web · Flask",
  },
  {
    icon: Sparkles,
    label: { es: "La IA estructura", en: "AI structures it" },
    tech: "GPT-3.5 → JSON",
    accent: true,
  },
  {
    icon: Volume2,
    label: { es: "Voz natural", en: "Natural voice" },
    tech: "Azure TTS → audio",
    accent: true,
  },
  {
    icon: Database,
    label: { es: "Config + audio", en: "Config + audio" },
    tech: "Azure Blob · Cosmos",
  },
  {
    icon: Cpu,
    label: { es: "Reproduce", en: "Plays it" },
    tech: "ESP32 · audio + LEDs",
  },
];

const branches: {
  icon: typeof Siren;
  text: Record<Lang, string>;
}[] = [
  {
    icon: Siren,
    text: {
      es: "Botón de emergencia → Twilio → SMS al cuidador",
      en: "Emergency button → Twilio → SMS to the caregiver",
    },
  },
  {
    icon: Thermometer,
    text: {
      es: "Sensor de temperatura → alerta según el clima",
      en: "Temperature sensor → weather-based alert",
    },
  },
];

export function MediAmigoFlow({ lang }: { lang: Lang }) {
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Fragment key={step.tech}>
              <div
                className={`flex flex-col gap-2 rounded-xl border px-4 py-4 md:flex-1 ${
                  step.accent
                    ? "border-accent/40 bg-accent-soft"
                    : "border-border bg-surface"
                }`}
              >
                <Icon
                  className={`size-5 ${
                    step.accent ? "text-accent" : "text-faint"
                  }`}
                  aria-hidden="true"
                />
                <span className="font-display text-sm font-semibold leading-tight text-text">
                  {step.label[lang]}
                </span>
                <span className="font-mono text-xs text-muted">{step.tech}</span>
              </div>
              {i < steps.length - 1 ? (
                <ChevronRight
                  className="mx-auto size-5 shrink-0 rotate-90 text-faint md:mx-0 md:rotate-0 md:self-center"
                  aria-hidden="true"
                />
              ) : null}
            </Fragment>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-col gap-3 sm:flex-row">
        {branches.map((branch) => {
          const Icon = branch.icon;
          return (
            <li
              key={branch.text.en}
              className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="font-mono text-xs text-muted">
                {branch.text[lang]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
