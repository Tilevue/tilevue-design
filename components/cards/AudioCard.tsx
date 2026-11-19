import { Play } from "lucide-react";
import { Arrow, Card, CardText, type BaseCard } from "../Card";

export type AudioCardProps = BaseCard & {
  /** Track page on Spotify, SoundCloud, Apple Music… — the card opens it, nothing plays here */
  href: string;
  title: string;
  /** Artist, show name… */
  subtitle?: string;
  cover?: string;
};

/** Waveform bar heights from the title, so each track gets its own stable shape. */
function bars(seed: string, n: number) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return Array.from({ length: n }, (_, i) => {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const r = ((h >>> 0) % 1000) / 1000;
    return 0.25 + 0.75 * Math.abs(Math.sin(i * 0.45) * 0.6 + r * 0.4); // smooth-ish envelope
  });
}

/** A track to listen to elsewhere: cover, title, a decorative waveform; tapping opens the track's page. */
export function AudioCard({ title, subtitle, cover, ...card }: AudioCardProps) {
  const wide = (card.size ?? "2x1") !== "1x1";
  const shape = bars(title, wide ? 48 : 22);
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between gap-3 p-4">
      <div className="flex items-center gap-3">
        <span
          className={`relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${cover ? "text-white" : "bg-ink text-page"}`}
        >
          {cover && (
            <>
              <img src={cover} alt="" className="absolute inset-0 size-full object-cover" />
              <span className="absolute inset-0 bg-black/30" />
            </>
          )}
          <Play className="relative ml-0.5 size-4 fill-current drop-shadow transition-transform duration-300 ease-spring group-hover:scale-110" />
        </span>
        <CardText title={title} subtitle={subtitle} className="min-w-0 flex-1 [&_p]:truncate" />
        <Arrow />
      </div>
      <div className="flex h-10 items-center gap-[2px]" aria-hidden>
        {shape.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-ink/15 transition-colors duration-200 ease-smooth group-hover:bg-ink/30"
            style={{ height: `${(h * 100).toFixed(1)}%` }}
          />
        ))}
      </div>
    </Card>
  );
}
