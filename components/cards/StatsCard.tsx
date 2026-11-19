import type { ReactNode } from "react";
import { ChartColumn } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type StatsCardProps = BaseCard & {
  /** Up to 3 numbers */
  stats: { value: string; label: string }[];
  /** Small gray text, top right */
  label?: string;
  icon?: ReactNode | string;
  /** GitHub username (only used by the editor and the daily refresh) */
  github?: string;
};

/** Big numbers: "40+ clients · 12 years · 3 products". */
export function StatsCard({ stats, label, icon = <ChartColumn strokeWidth={1.75} />, github: _github, ...card }: StatsCardProps) {
  const shown = stats.slice(0, 3);
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={label ? <Badge>{label}</Badge> : card.href && <Arrow />} />
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${shown.length || 1}, minmax(0, 1fr))` }}>
        {shown.map((s, i) => (
          <div key={i} className="min-w-0">
            <p className="truncate text-[32px] leading-none font-semibold tracking-[-0.02em] tabular-nums">{s.value}</p>
            <p className="mt-1.5 truncate text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
