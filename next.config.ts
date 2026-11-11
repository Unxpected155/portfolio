import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator badge (the floating "N") during local dev.
  devIndicators: false,
  // Don't auto-generate AGENTS.md on dev start.
  agentRules: false,
};

export default nextConfig;
