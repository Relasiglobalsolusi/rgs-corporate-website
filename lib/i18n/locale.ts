export type AppLocale = "en" | "id";

export const DEFAULT_LOCALE: AppLocale = "en";
export const LOCALE_STORAGE_KEY = "rgs-locale";
export const LOCALE_COOKIE_NAME = "rgs-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const LOCALE_CHANGE_EVENT = "rgs-locale-change";

export const APP_LOCALES: readonly AppLocale[] = ["en", "id"] as const;

export function isAppLocale(value: unknown): value is AppLocale {
  return value === "en" || value === "id";
}

export function localeToBcp47(locale: AppLocale): string {
  return locale === "id" ? "id-ID" : "en-GB";
}

export function parseAppLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : DEFAULT_LOCALE;
}

export function readStoredLocale(): AppLocale | null {
  if (typeof window === "undefined") return null;

  try {
    const fromStorage = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isAppLocale(fromStorage)) return fromStorage;
  } catch {
    /* ignore */
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`)
  );
  const fromCookie = match?.[1] ? decodeURIComponent(match[1]) : null;
  return isAppLocale(fromCookie) ? fromCookie : null;
}

export function getLocale(): AppLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return readStoredLocale() ?? parseAppLocale(document.documentElement.lang?.slice(0, 2));
}

export function persistLocale(locale: AppLocale) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }

  const secure =
    typeof window.location !== "undefined" &&
    window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;

  applyDocumentLocale(locale);
  window.dispatchEvent(
    new CustomEvent(LOCALE_CHANGE_EVENT, { detail: { locale } })
  );
}

export function applyDocumentLocale(locale: AppLocale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
}
