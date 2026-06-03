"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Shows the email address as a button that copies it to the clipboard with
 * inline confirmation feedback.
 */
export function CopyEmail({
  email,
  copyLabel,
  copiedLabel,
}: {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : `${copyLabel}: ${email}`}
      className="group inline-flex cursor-pointer items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-text"
    >
      <span>{email}</span>
      {copied ? (
        <span className="inline-flex items-center gap-1 text-accent">
          <Check className="size-4" aria-hidden="true" />
          {copiedLabel}
        </span>
      ) : (
        <Copy
          className="size-4 text-faint transition-colors group-hover:text-accent"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
