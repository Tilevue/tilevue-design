import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type ProgressCardProps = BaseCard & {
  /** 0–100 */
  value: number;
  title: string;
  /** e.g. "12 of 24 books" */
  subtitle?: string;
};

/** Progress ring: a goal, a book being written, a degree, a challenge. */
export function ProgressCard({ value, title, subtitle, ...card }: ProgressCardProps) {
  const v = Math.max(0, Math.min(100, value));
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="relative flex size-16 items-center justify-center">
            <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90 transition-transform duration-500 ease-spring group-hover:rotate-[-80deg]">
              <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" className="stroke-fill" />
              <circle
                cx="32"
                cy="32"
                r={r}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                className="stroke-ink"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - v / 100)}
              />
            </svg>
            <span className="text-sm font-semibold tabular-nums">{Math.round(v)}%</span>
          </span>
        }
        right={card.href && <Arrow />}
      />
      <CardText title={title} subtitle={subtitle} />
    </Card>
  );
}
