import type { ReactNode } from "react";
import { ChartNoAxesGantt } from "lucide-react";
import { Arrow, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type SkillsCardProps = BaseCard & {
  title: string;
  /** level 0–100 */
  skills: { name: string; level: number }[];
  icon?: ReactNode | string;
};

/** Skills or languages with level bars (the bars grow a little on hover). */
export function SkillsCard({ title, skills, icon = <ChartNoAxesGantt strokeWidth={1.75} />, ...card }: SkillsCardProps) {
  const wide = (card.size ?? "1x1") !== "1x1";
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="flex items-center gap-2 text-sm">
            <CardIcon icon={icon} /> {title}
          </span>
        }
        right={card.href && <Arrow />}
      />
      <ul className={`gap-x-4 gap-y-2 text-xs ${wide ? "grid grid-cols-2" : "space-y-2"}`}>
        {skills.slice(0, wide ? 6 : 3).map((s, i) => (
          <li key={i} className="space-y-1">
            <span className="flex justify-between gap-2">
              <span className="truncate">{s.name}</span>
              <span className="text-subtle tabular-nums">{Math.round(s.level)}%</span>
            </span>
            <span className="block h-1.5 overflow-hidden rounded-full bg-fill">
              <span
                className="block h-full origin-left scale-x-95 rounded-full bg-ink transition-transform duration-500 ease-spring group-hover:scale-x-100"
                style={{ width: `${Math.max(0, Math.min(100, s.level))}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
