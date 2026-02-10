/**
 * Backend API base URL.
 * Set NEXT_PUBLIC_API_URL in your environment (e.g. in Coolify) when deploying.
 * Defaults to http://localhost:3001 for local development.
 */
export const API_BASE_URL =
  typeof process.env.NEXT_PUBLIC_API_URL === "string" &&
  process.env.NEXT_PUBLIC_API_URL !== ""
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "http://localhost:3001"
