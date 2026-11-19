import { Plane } from "lucide-react";
import { countryCoords } from "@/lib/countries";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Globe } from "../Globe";

export type TravelCardProps = BaseCard & {
  title?: string;
  /** Country names, e.g. ["Japan", "Italy"] — known ones get a red pin on the globe */
  countries: string[];
};

/** Places you've been: a count, a few names, and a spinning globe with a pin per country. */
export function TravelCard({ title = "Places I've been", countries, ...card }: TravelCardProps) {
  const pins = countries.map(countryCoords).filter((c): c is [number, number] => !!c);
  const shown = countries.slice(0, 3);
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="flex items-center gap-2 text-sm">
            <CardIcon icon={<Plane strokeWidth={1.75} />} /> {title}
          </span>
        }
      />
      <Globe coords={pins[0] ?? [30, 10]} markers={pins} speed={0.003} className="absolute top-[-8%] right-[-14%] w-[62%]" />
      <div className="relative z-10 max-w-[55%] space-y-2">
        <p className="flex items-baseline gap-1.5">
          <span className="text-[32px] leading-none font-semibold tracking-[-0.02em] tabular-nums">{countries.length}</span>
          <span className="text-sm text-muted">{countries.length === 1 ? "country" : "countries"}</span>
        </p>
        <div className="flex flex-wrap gap-1">
          {shown.map((c, i) => (
            <span key={i} className="rounded-full bg-fill px-2.5 py-1 text-xs">
              {c}
            </span>
          ))}
          {countries.length > shown.length && <span className="px-1 py-1 text-xs text-subtle">+{countries.length - shown.length}</span>}
        </div>
      </div>
    </Card>
  );
}
