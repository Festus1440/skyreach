/**
 * PostHog funnel event names and helpers for the heating-winter-2026-offer funnel.
 * Use these so PostHog insights (e.g. Funnel) can filter by the same event names.
 *
 * Step names (step_name) for easy identification in PostHog:
 * 1 Heating system type, 2 Filter size, 3 Last service, 4 Current issues,
 * 5 Property type, 6 Service timing, 7 Contact form
 */
export const FUNNEL_NAME = "heating_winter_2026_offer"

export const FunnelEvents = {
  /** User landed on the funnel page */
  STARTED: "funnel_started",
  /** User viewed a step. Properties: step_index, step_name, step_id, step_type, question_text, total_steps */
  STEP_VIEWED: "funnel_step_viewed",
  /** User left a step. Properties: step_index, step_name, time_on_step_seconds, answer (if any). Use for drop-off + time on step. */
  STEP_COMPLETED: "funnel_step_completed",
  /** User submitted the contact form. Properties: success, error_message (if failed) */
  CONTACT_SUBMITTED: "funnel_contact_submitted",
  /** Fires only when lead submit succeeded (API returned success). Use for lead count and funnel conversion. */
  LEAD_SUBMITTED: "funnel_lead_submitted",
} as const

export type FunnelEventName = (typeof FunnelEvents)[keyof typeof FunnelEvents]
