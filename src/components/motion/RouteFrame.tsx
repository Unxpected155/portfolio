"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Forces the page content to remount when the route (language) changes by
 * keying on the pathname. This makes every entrance animation (hero cascade,
 * section reveals, split headings) replay on navigation, so the new view enters
 * with its own motion instead of appearing fully formed. `display: contents`
 * keeps it layout-transparent.
 */
export function RouteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
