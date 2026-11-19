import { CalendarCheck, MapPin } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type ItineraryStep = {
  time: string;
  title: string;
  note?: string;
};

export type ItineraryCardProps = BaseCard & {
  title: string;
  date: string;
  place?: string;
  mapLink?: string;
  steps: ItineraryStep[];
  rsvpLabel?: string;
};

/** Event itinerary & RSVP card: schedule timeline with times, venue, and RSVP link. */
export function ItineraryCard({
  title,
  date,
  place,
  mapLink,
  steps = [
    { time: "14:00", title: "Ceremony" },
    { time: "16:30", title: "Cocktails" },
    { time: "19:00", title: "Dinner & Celebration" },
  ],
  rsvpLabel = "RSVP",
  ...card
}: ItineraryCardProps) {
  const gmap = mapLink || (place ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}` : undefined);

  const sub = place ? (
    <span className="inline-flex items-center gap-1">
      <MapPin className="size-3 shrink-0 text-muted" />
      {gmap && !card.href ? ( /* a linked card is already an <a>; a map link inside would be <a> in <a> */
        <a
          href={gmap}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate hover:text-ink hover:underline transition-colors"
        >
          {place}
        </a>
      ) : (
        <span className="truncate">{place}</span>
      )}
    </span>
  ) : undefined;

  return (
    <Card
      {...card}
      size={card.size ?? "2x1"}
      layout="flex flex-col justify-between p-4"
    >
      <CardTop
        left={
          <span className="flex items-center gap-2 text-sm font-medium">
            <CardIcon icon={<CalendarCheck strokeWidth={1.75} />} /> {title}
          </span>
        }
        right={
          <div className="flex items-center gap-2">
            {card.href && rsvpLabel && (
              <span className="rounded-full bg-fill px-2.5 py-0.5 text-xs font-medium text-ink transition-colors duration-200 ease-smooth group-hover:bg-ink group-hover:text-page">
                {rsvpLabel}
              </span>
            )}
            {card.href ? <Arrow /> : <Badge>{date}</Badge>}
          </div>
        }
      />

      <ol className="relative space-y-1.5 text-sm before:absolute before:top-2 before:bottom-2 before:left-[3px] before:w-px before:bg-ring">
        {steps.slice(0, 3).map((s, i) => (
          <li key={i} className="relative flex items-baseline gap-3 pl-5">
            <span className={`absolute top-1.5 left-0 size-[7px] rounded-full ${i === 0 ? "bg-ink" : "bg-subtle/50"}`} />
            <span className="w-14 shrink-0 font-mono text-xs text-muted tabular-nums">{s.time}</span>
            <span className="truncate">
              {s.title}
              {s.note && <span className="text-muted"> · {s.note}</span>}
            </span>
          </li>
        ))}
      </ol>

      <CardText title={date} subtitle={sub} />
    </Card>
  );
}
