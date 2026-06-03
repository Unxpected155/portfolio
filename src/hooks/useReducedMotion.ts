"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting and reacts to changes.
 * Reads the value synchronously on the first client render so non-reduced users
 * don't get a one-frame flash from a true -> false flip. On the server it
 * resolves to `false`, but no GSAP code runs there (effects are client-only),
 * and no component varies its markup on this value, so there's no hydration
 * mismatch.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
