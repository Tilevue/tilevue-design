import { Card, CardTop, type BaseCard } from "../Card";

export type TopCardProps = BaseCard & {
  /** e.g. "Top 3 films" */
  title: string;
  items: string[];
};

/** A ranked top 3 with big faded numbers (they darken on hover). */
export function TopCard({ title, items, ...card }: TopCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{title}</span>} />
      <ol className="space-y-1">
        {items.slice(0, 3).map((it, i) => (
          <li key={i} className="flex items-baseline gap-3">
            <span
              className="w-5 shrink-0 text-2xl leading-7 font-semibold tracking-[-0.02em] text-ink/15 tabular-nums transition-colors duration-300 ease-smooth group-hover:text-ink/40"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {i + 1}
            </span>
            <span className="truncate text-sm">{it}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
