import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type EventCardProps = BaseCard & {
  title: string;
  /** "2026-11-14" or "2026-11-14T19:00" */
  date: string;
  /** e.g. "Vienna · 19:00" */
  place?: string;
  mapLink?: string;
};

/** An upcoming event with a calendar-style date tile (tilts on hover like the podcast cover). */
export function EventCard({ title, date, place, mapLink, ...card }: EventCardProps) {
  // Show the date exactly as written (no time-zone shift between server and visitor)
  const d = new Date(`${date.slice(0, 10)}T00:00:00Z`);
  const valid = !Number.isNaN(d.getTime());
  const month = valid ? d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) : "";
  const day = valid ? d.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" }) : "–";

  const gmap = mapLink || (place ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}` : undefined);
  // the whole card is already a link when href is set — a map link inside it would be an <a> in an <a>
  const sub = place && gmap && !card.href ? (
    <a
      href={gmap}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline hover:text-ink transition-colors"
    >
      {place}
    </a>
  ) : place;

  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="flex w-14 flex-col items-center overflow-hidden rounded-xl bg-card shadow-card transition-transform duration-200 ease-smooth group-hover:-rotate-3">
            <span className="w-full bg-red-500 py-0.5 text-center text-[10px] font-semibold tracking-wide text-white uppercase">{month}</span>
            <span className="py-1 text-2xl leading-8 font-semibold tabular-nums">{day}</span>
          </span>
        }
        right={card.href && <Arrow />}
      />
      <CardText title={title} subtitle={sub} />
    </Card>
  );
}
