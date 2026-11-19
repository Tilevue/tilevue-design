import { Star } from "lucide-react";
import type { BaseCard } from "../Card";
import { MediaCard } from "./MediaCard";

export type WatchCardProps = BaseCard & {
  /** Background; empty = the poster */
  media?: string;
  poster: string;
  title: string;
  label?: string;
  /** 0–5 */
  rating?: number;
};

/** "Recent watch" — trailer in the background, poster + star rating on top. */
export function WatchCard({ media, poster, title, label = "Recent watch", rating = 5, ...card }: WatchCardProps) {
  return (
    <MediaCard
      {...card}
      size={card.size ?? "2x1"}
      media={media || poster}
      icon={<img src={poster} alt="" className="w-[52px] rounded shadow-card" />}
      title={title}
    >
      <div className="mb-1 flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`size-[18px] ${i < rating ? "fill-amber-400 text-amber-400" : "text-white/40"}`} />
        ))}
      </div>
      <p className="text-sm text-white/50">{label}</p>
    </MediaCard>
  );
}
