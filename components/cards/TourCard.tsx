import type { ReactNode } from "react";
import { Ticket } from "lucide-react";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";

type Show = { date: string; city: string; venue?: string; href?: string; soldOut?: boolean };

export type TourCardProps = Omit<BaseCard, "href"> & {
  title: string;
  shows: Show[];
  icon?: ReactNode | string;
};

const fmt = (d: string) => {
  const t = new Date(`${d.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(t.getTime()) ? d : t.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
};

/** Tour dates with ticket links. */
export function TourCard({ title, shows, icon = <Ticket strokeWidth={1.75} />, ...card }: TourCardProps) {
  const wide = (card.size ?? "2x1") !== "1x1";
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="flex items-center gap-2 text-sm">
            <CardIcon icon={icon} /> {title}
          </span>
        }
      />
      <ul className="-mx-2 text-sm">
        {shows.slice(0, wide ? 3 : 2).map((s, i) => (
          <li key={i}>
            <a
              href={s.soldOut ? undefined : s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 rounded-lg px-2 py-1 transition-colors duration-200 ease-smooth ${s.href && !s.soldOut ? "hover:bg-fill" : ""}`}
            >
              <span className="w-12 shrink-0 font-mono text-xs text-subtle uppercase">{fmt(s.date)}</span>
              <span className="min-w-0 flex-1 truncate">
                {s.city}
                {wide && s.venue && <span className="text-muted"> · {s.venue}</span>}
              </span>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.soldOut ? "text-subtle line-through" : "bg-fill"}`}>
                {s.soldOut ? "Sold out" : "Tickets"}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
