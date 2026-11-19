import type { ReactNode } from "react";
import { Activity } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type ActivityCardProps = BaseCard & {
  title: string;
  /** e.g. "1,204 this year" */
  total?: string;
  /** How busy the grid looks */
  intensity?: "low" | "medium" | "high";
  icon?: ReactNode | string;
  /** Real grid from a smart card (lib/github.ts): one digit 0–4 per day, oldest first, starting on a Sunday */
  levels?: string;
  /** GitHub username (only used by the editor and the daily refresh) */
  github?: string;
  /** grid = GitHub squares; month = gym-style calendar of this month */
  look?: "grid" | "month";
};

/** Small deterministic random generator, so the pattern is stable for the same title. */
function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const shades = ["bg-fill", "bg-ink/15", "bg-ink/30", "bg-ink/55", "bg-ink/80"];
const busy = { low: 0.35, medium: 0.6, high: 0.85 };

/** GitHub-style activity grid (decorative): commits, workouts, posts… in theme grays. */
export function ActivityCard({ title, total, intensity = "medium", icon = <Activity strokeWidth={1.75} />, levels: real, github: _github, look = "grid", ...card }: ActivityCardProps) {
  const weeks = (card.size ?? "2x1") === "1x1" ? 12 : 26;
  const rand = rng(title + intensity);
  // one level (0–4) per day, oldest first, last = today
  const days = real
    ? [...real].map(Number)
    : Array.from({ length: 26 * 7 }, () => {
        const r = rand();
        return r > busy[intensity] ? 0 : Math.min(4, 1 + Math.floor(rand() * 4 * busy[intensity] + 0.3));
      });

  const top = (
    <CardTop
      left={
        <span className="flex items-center gap-2 text-sm">
          <CardIcon icon={icon} /> {title}
        </span>
      }
      right={total ? <Badge>{total}</Badge> : card.href && <Arrow />}
    />
  );
  const shell = (body: ReactNode) => (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between gap-3 p-4">
      {top}
      {body}
    </Card>
  );

  if (look === "month") {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const inMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const sofar = days.slice(-now.getDate());
    const done = sofar.filter(Boolean).length;
    return shell(
      <div className="flex items-end justify-between gap-4">
        <div className={weeks === 12 ? "hidden" : ""}>
          <p className="text-4xl leading-none font-semibold tabular-nums">{done}</p>
          <p className="mt-1 text-sm text-muted">
            sessions in {now.toLocaleDateString("en-US", { month: "long" })}
          </p>
        </div>
        <div className={`grid grid-cols-7 ${weeks === 12 ? "w-full justify-items-center gap-y-1.5" : "gap-1"}`} aria-hidden>
          {Array.from({ length: first }, (_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: inMonth }, (_, d) => (
            <span
              key={d}
              className={`size-3.5 rounded-full ${d >= sofar.length ? "bg-fill/50" : sofar[d] ? "bg-ink" : "bg-fill"} ${d === sofar.length - 1 ? "ring-2 ring-ink/30 ring-offset-1 ring-offset-card" : ""}`}
            />
          ))}
        </div>
      </div>,
    );
  }

  // grid: last `weeks` columns; the current week may be partial
  const levels = real ? days.slice(Math.max(0, Math.floor((days.length - 1) / 7) * 7 - (weeks - 1) * 7)) : days.slice(-weeks * 7);
  return shell(
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }} aria-hidden>
      {levels.map((l, i) => (
        <span key={i} className={`aspect-square rounded-[3px] ${shades[l]}`} />
      ))}
    </div>,
  );
}
