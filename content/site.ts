/**
 * Stand-in for the app's site config: only the values the cards and header read. The real one holds things this
 * repo doesn't need (accounts, emails, partner settings).
 */
export const site = {
  name: "Tilevue",
  url: "https://tilevue.com",
  domain: "tilevue.com",
  showClock: true,
  /** IANA zone for the header clock, e.g. "Europe/Vienna". Undefined = the visitor's time. */
  timeZone: undefined as string | undefined,
  lang: "en",
  colorScheme: "system" as "system" | "light" | "dark",
  blog: { minutesSuffix: " m", dateLocale: "en-GB" },
};
