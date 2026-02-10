/**
 * Site-wide contact info from environment variables.
 * Set NEXT_PUBLIC_PHONE and NEXT_PUBLIC_EMAIL in .env or your deployment config.
 */

const rawPhone = process.env.NEXT_PUBLIC_PHONE ?? "1-800-123-4567"
const rawEmail = process.env.NEXT_PUBLIC_EMAIL ?? "service@skyreachair.com"

/** Phone number as displayed (e.g. "1-800-123-4567") */
export const sitePhone = rawPhone.trim() || "1-800-123-4567"

/** Phone for tel: links (digits only; prepends +1 if 10 digits for US) */
export function sitePhoneTel(): string {
  const digits = sitePhone.replace(/\D/g, "")
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
  return digits ? `+${digits}` : "+18001234567"
}

/** Contact email */
export const siteEmail = rawEmail.trim() || "service@skyreachair.com"
