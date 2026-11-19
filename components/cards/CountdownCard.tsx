"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Timer } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type CountdownCardProps = BaseCard & {
  title: string;
  /** "2026-12-24" or "2026-12-24T18:00" (visitor's local time) */
  date: string;
  /** Shown once the date has passed */
  doneText?: string;
  icon?: ReactNode | string;
};

function left(target: number, now: number) {
  const ms = Math.max(0, target - now);
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return d > 0 ? `${d}d ${String(h).padStart(2, "0")}h` : `${h}h ${String(m).padStart(2, "0")}m`;
}

/** Live countdown to a launch, event or trip. */
export function CountdownCard({ title, date, doneText = "It's here", icon = <Timer strokeWidth={1.75} />, ...card }: CountdownCardProps) {
  const target = new Date(date).getTime();
  const [now, setNow] = useState<number | null>(null); // client-only, avoids hydration mismatch
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const valid = Number.isFinite(target);
  const done = valid && now !== null && now >= target;
  const day = valid ? new Date(target).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={card.href ? <Arrow /> : day && <Badge>{day}</Badge>} />
      <div className="space-y-2">
        <p className="text-[32px] leading-none font-semibold tracking-[-0.02em] tabular-nums">
          {!valid ? "—" : now === null ? " " : done ? doneText : left(target, now)}
        </p>
        <CardText title={title} />
      </div>
    </Card>
  );
}
