import { Card, CardTop, type BaseCard } from "../Card";

type Step = { year: string; label: string; emoji?: string };

export type MilestonesCardProps = BaseCard & {
  title?: string;
  /** Oldest first, up to 4 */
  steps: Step[];
};

/** Life's big moments on a horizontal line — the dots pop on hover. */
export function MilestonesCard({ title = "Milestones", steps, ...card }: MilestonesCardProps) {
  const shown = steps.slice(0, 4);
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{title}</span>} />
      <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${shown.length || 1}, minmax(0, 1fr))` }}>
        <span className="absolute top-[34px] right-[12%] left-[12%] h-px bg-ring" aria-hidden />
        {shown.map((s, i) => (
          <li key={i} className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-xl leading-6">{s.emoji || "•"}</span>
            <span
              className={`relative size-2.5 rounded-full ring-4 ring-card transition-transform duration-300 ease-spring group-hover:scale-150 ${i === shown.length - 1 ? "bg-ink" : "bg-subtle"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            />
            <span className="font-mono text-[11px] text-subtle tabular-nums">{s.year}</span>
            <span className="line-clamp-2 px-1 text-xs leading-4">{s.label}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
