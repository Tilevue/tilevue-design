import { Card, CardText, type BaseCard } from "../Card";

export type MemoryCardProps = BaseCard & {
  image: string;
  /** When it happened, "2023-07-14" */
  date: string;
  caption?: string;
};

function ago(date: string) {
  const d = new Date(`${date.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  const years = new Date().getUTCFullYear() - d.getUTCFullYear();
  const day = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return years >= 1 ? `${years} year${years > 1 ? "s" : ""} ago · ${day}` : day;
}

/** A photo memory with "x years ago". Fades on hover like the photo cards. */
export function MemoryCard({ image, date, caption, ...card }: MemoryCardProps) {
  return (
    <Card {...card} hover={card.hover ?? "none"} layout="flex flex-col justify-between p-4">
      <div className="absolute inset-0 transition-opacity duration-200 ease-smooth group-hover:opacity-80">
        <img src={image} alt={caption ?? ""} loading="lazy" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 from-0% via-transparent via-35% to-black/60" />
      </div>
      <span className="relative z-10 w-fit rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">{ago(date)}</span>
      {caption && <CardText title={caption} light />}
    </Card>
  );
}
