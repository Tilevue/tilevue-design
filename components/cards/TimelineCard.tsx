import type { ReactNode } from "react";
import { Milestone } from "lucide-react";
import { Arrow, Card, CardIcon, CardTop, type BaseCard } from "../Card";

type Step = { when: string; what: string; where?: string };

export type TimelineCardProps = BaseCard & {
  title: string;
  /** Newest first; the first 3 are shown */
  steps: Step[];
  icon?: ReactNode | string;
};

/** Experience, education or life milestones on a small timeline. */
export function TimelineCard({ title, steps, icon = <Milestone strokeWidth={1.75} />, ...card }: TimelineCardProps) {
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="flex items-center gap-2 text-sm">
            <CardIcon icon={icon} /> {title}
          </span>
        }
        right={card.href && <Arrow />}
      />
      <ol className="relative space-y-1.5 text-sm before:absolute before:top-2 before:bottom-2 before:left-[3px] before:w-px before:bg-ring">
        {steps.slice(0, 3).map((s, i) => (
          <li key={i} className="relative flex items-baseline gap-3 pl-5">
            <span className={`absolute top-1.5 left-0 size-[7px] rounded-full ${i === 0 ? "bg-ink" : "bg-subtle/50"}`} />
            <span className="w-20 shrink-0 text-muted tabular-nums">{s.when}</span>
            <span className="truncate">
              {s.what}
              {s.where && <span className="text-muted"> · {s.where}</span>}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
