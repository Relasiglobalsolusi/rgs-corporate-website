/** Lightweight className helper for optional UI primitives (no external deps). */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
