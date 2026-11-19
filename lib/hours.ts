/**
 * "Open now?" from human-written opening hours:
 *   days:  "Mon–Fri", "Sat, Sun", "Mon-Wed, Fri", "Daily", "Every day", "Weekends"
 *   hours: "09:00–18:00", "9:00 - 17:30", "18:00–02:00" (past midnight), "Closed"
 */

export type HoursRow = { days: string; hours: string };

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DASH = /\s*(?:–|—|-|to)\s*/;

/** Weekday numbers (0 = Sunday) a row covers. Unknown text → []. */
export function parseDays(spec: string): number[] {
  const s = spec.trim().toLowerCase();
  if (/^(daily|every ?day|all week)$/.test(s)) return [0, 1, 2, 3, 4, 5, 6];
  if (s === "weekdays") return [1, 2, 3, 4, 5];
  if (s === "weekends") return [0, 6];
  const out = new Set<number>();
  for (const part of s.split(/\s*[,&/]\s*|\s+and\s+/)) {
    const [a, b] = part.split(DASH).map((d) => DAYS.indexOf(d.slice(0, 3)));
    if (a < 0) continue;
    if (b === undefined) out.add(a);
    else if (b >= 0) for (let d = a; ; d = (d + 1) % 7) { out.add(d); if (d === b) break; }
  }
  return [...out];
}

/** [openMinutes, closeMinutes] or null for "Closed" / unreadable text. */
export function parseHours(spec: string): [number, number] | null {
  const m = spec.trim().match(/^(\d{1,2})[:.](\d{2})\s*(?:–|—|-|to)\s*(\d{1,2})[:.](\d{2})$/i);
  if (!m) return null;
  return [+m[1] * 60 + +m[2], +m[3] * 60 + +m[4]];
}

/** true / false, or null when the rows can't be read. `day` 0 = Sunday, `minutes` since midnight. */
export function isOpen(rows: HoursRow[], day: number, minutes: number): boolean | null {
  let understood = false;
  for (const row of rows) {
    const days = parseDays(row.days);
    if (!days.length) continue;
    understood = true;
    const span = parseHours(row.hours);
    if (!span) continue;
    const [open, close] = span;
    if (close > open) {
      if (days.includes(day) && minutes >= open && minutes < close) return true;
    } else {
      // past midnight: open late on `day`, or still open early the next morning
      if (days.includes(day) && minutes >= open) return true;
      if (days.includes((day + 6) % 7) && minutes < close) return true;
    }
  }
  return understood ? false : null;
}

/** Current weekday + minutes in a time zone (or the visitor's own when invalid/empty). */
export function nowIn(timeZone?: string, date = new Date()): { day: number; minutes: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: timeZone || undefined, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
    const get = (t: string) => parts.find((p) => p.type === t)!.value;
    return { day: DAYS.indexOf(get("weekday").toLowerCase()), minutes: +get("hour") * 60 + +get("minute") };
  } catch {
    return timeZone ? nowIn(undefined, date) : { day: date.getDay(), minutes: date.getHours() * 60 + date.getMinutes() };
  }
}
