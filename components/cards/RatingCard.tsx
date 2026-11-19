import { Star } from "lucide-react";
import { Arrow, Badge, Card, CardTop, type BaseCard } from "../Card";

export type RatingCardProps = BaseCard & {
  /** 0–5 */
  score: number;
  /** e.g. "1,284 reviews" */
  count?: string;
  /** e.g. "Google reviews" */
  source: string;
};

/** Review summary: big score, stars, where it's from. */
export function RatingCard({ score, count, source, ...card }: RatingCardProps) {
  const s = Math.max(0, Math.min(5, score));
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={<Star className="card-icon size-5 fill-amber-400 text-amber-400" />}
        right={count ? <Badge>{count}</Badge> : card.href && <Arrow />}
      />
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <span className="text-[32px] leading-none font-semibold tracking-[-0.02em] tabular-nums">{s.toFixed(1)}</span>
          <span className="relative mb-1 flex" aria-label={`${s} out of 5`}>
            {/* gray stars with gold stars clipped to the score on top */}
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3.5 fill-ink/10 text-transparent" />
            ))}
            <span className="absolute inset-0 flex overflow-hidden" style={{ width: `${((s / 5) * 100).toFixed(1)}%` }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3.5 shrink-0 fill-amber-400 text-transparent" />
              ))}
            </span>
          </span>
        </div>
        <p className="text-sm">{source}</p>
      </div>
    </Card>
  );
}
