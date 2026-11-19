import { MapPin } from "lucide-react";
import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type ListingCardProps = BaseCard & {
  image: string;
  title: string;
  price: string;
  location?: string;
  mapLink?: string;
  badge?: string;
  specs?: string[];
};

/** Property / rental listing: photo background, price tag, specs pills, and location with Google Maps pin. */
export function ListingCard({
  image,
  title,
  price,
  location,
  mapLink,
  badge = "For Sale",
  specs,
  ...card
}: ListingCardProps) {
  const gmap = mapLink || (location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}` : undefined);

  const loc = location ? (
    <span className="inline-flex items-center gap-1">
      <MapPin className="size-3 shrink-0 opacity-70" />
      {gmap && !card.href ? ( /* a linked card is already an <a>; a map link inside would be <a> in <a> */
        <a
          href={gmap}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate hover:underline hover:text-white transition-colors"
        >
          {location}
        </a>
      ) : (
        <span className="truncate">{location}</span>
      )}
    </span>
  ) : undefined;

  return (
    <Card
      {...card}
      size={card.size ?? "2x1"}
      hover={card.hover ?? "none"}
      layout="relative flex flex-col justify-between p-4 overflow-hidden"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/75 pointer-events-none" />

      <CardTop
        left={
          badge ? (
            <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
              {badge}
            </span>
          ) : <span />
        }
        right={
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-xs font-medium text-white tabular-nums backdrop-blur">
              {price}
            </span>
            {card.href && <Arrow className="text-white" />}
          </div>
        }
      />

      <div className="relative z-10">
        {specs && specs.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {specs.map((s, i) => (
              <span
                key={i}
                className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <CardText title={title} subtitle={loc} light />
      </div>
    </Card>
  );
}
