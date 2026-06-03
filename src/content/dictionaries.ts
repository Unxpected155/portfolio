import { es } from "./es";
import { en } from "./en";
import type { Dictionary, Lang } from "./types";

export const locales = ["es", "en"] as const;
export const defaultLocale: Lang = "es";

const dictionaries: Record<Lang, Dictionary> = { es, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries[defaultLocale];
}

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

export type { Dictionary, Lang };
