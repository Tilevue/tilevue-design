/**
 * Cal.com's public API (no key, CORS open) for the "Book a call" card:
 *   calEvent → title + second line (editor fill, via /api/oembed)
 *   calSlots → next free start times (the card, in the visitor's browser)
 * Works with a profile link (cal.com/<user>) or one event's link (cal.com/<user>/<event>).
 */

/** "https://cal.com/<user>[/<event>]" → its parts, else null.
 *  ponytail: personal links only — team links (cal.com/team/…) and own domains just open the booking page. */
export function calParts(href: string): { user: string; slug?: string } | null {
  const m = /^https:\/\/(?:www\.)?cal\.com\/([\w.-]+)(?:\/([\w.-]+))?\/?(?:[?#].*)?$/i.exec(href.trim());
  return m && m[1].toLowerCase() !== "team" ? { user: m[1], slug: m[2] } : null;
}

const q = encodeURIComponent;

async function api(path: string, version: string, signal?: AbortSignal) {
  const res = await fetch(`https://api.cal.com/v2${path}`, { headers: { "cal-api-version": version }, signal });
  if (!res.ok) throw new Error(String(res.status));
  return (await res.json()) as { data?: unknown };
}

type CalEvent = { slug: string; title: string; lengthInMinutes: number; hidden?: boolean; users?: { name?: string }[] };

/** The link's event, or every bookable event on the profile (shortest first). */
async function events({ user, slug }: { user: string; slug?: string }, signal?: AbortSignal): Promise<CalEvent[]> {
  const { data } = await api(`/event-types?username=${q(user)}${slug ? `&eventSlug=${q(slug)}` : ""}`, "2024-06-14", signal);
  const list = (Array.isArray(data) ? data : []) as CalEvent[];
  return list
    .filter((e) => typeof e.slug === "string" && typeof e.title === "string" && !e.hidden)
    .sort((a, b) => (a.lengthInMinutes ?? 0) - (b.lengthInMinutes ?? 0));
}

const mins = (n: unknown) => (typeof n === "number" && n > 0 ? n : 0);

/** Event link → "30 min meeting" · "30 min". Profile link → "Book a call with Sam" · "15 or 30 min". */
export async function calEvent(cal: { user: string; slug?: string }, signal?: AbortSignal) {
  const list = await events(cal, signal);
  if (!list.length) throw new Error("not found");
  if (cal.slug) {
    const m = mins(list[0].lengthInMinutes);
    return { title: list[0].title.trim().slice(0, 200), subtitle: m ? `${m} min` : "" };
  }
  const first = list[0].users?.[0]?.name?.trim().split(/\s+/)[0];
  const lengths = [...new Set(list.map((e) => mins(e.lengthInMinutes)).filter(Boolean))];
  return {
    title: first ? `Book a call with ${first.slice(0, 60)}` : "Book a call",
    subtitle: lengths.length ? `${lengths.slice(0, -1).join(", ")}${lengths.length > 1 ? " or " : ""}${lengths.at(-1)} min` : "",
  };
}

/** Earliest free time on each of the next free days (up to `days`), formatted for the visitor ("Tue 10:00").
 *  Profile link → the shortest event's times. */
export async function calSlots(href: string, days = 3, signal?: AbortSignal): Promise<string[]> {
  const cal = calParts(href);
  if (!cal) return [];
  const slug = cal.slug ?? (await events(cal, signal))[0]?.slug;
  if (!slug) return [];
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const start = new Date();
  const end = new Date(start.getTime() + 14 * 86_400_000);
  const { data } = await api(
    `/slots?username=${q(cal.user)}&eventTypeSlug=${q(slug)}&start=${start.toISOString()}&end=${end.toISOString()}&timeZone=${q(tz)}`,
    "2024-09-04",
    signal,
  );
  const fmt = new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit" });
  return Object.values((data ?? {}) as Record<string, { start?: string }[]>)
    .map((day) => day[0]?.start)
    .filter((s): s is string => !!s)
    .sort()
    .slice(0, days)
    .map((s) => fmt.format(new Date(s)));
}
