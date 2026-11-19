"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Clock } from "lucide-react";
import { isOpen, nowIn, type HoursRow } from "@/lib/hours";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type HoursCardProps = BaseCard & {
  /** e.g. { days: "Mon–Fri", hours: "09:00–18:00" }, { days: "Sun", hours: "Closed" } */
  rows: HoursRow[];
  /** Where the business is, e.g. "Europe/Vienna" (default: visitor's time) */
  timeZone?: string;
  icon?: ReactNode | string;
};

/** Opening hours with a live "Open now / Closed" badge. */
export function HoursCard({ rows, timeZone, icon = <Clock strokeWidth={1.75} />, ...card }: HoursCardProps) {
  const [open, setOpen] = useState<boolean | null>(null); // computed in the browser (time-dependent)
  useEffect(() => {
    const tick = () => {
      const { day, minutes } = nowIn(timeZone);
      setOpen(isOpen(rows, day, minutes));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [rows, timeZone]);

  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={<CardIcon icon={icon} />}
        right={
          open !== null && (
            <span className="flex items-center gap-1.5 text-sm text-subtle">
              <span className={`size-2 rounded-full ${open ? "bg-emerald-500" : "bg-red-400"}`} />
              {open ? "Open now" : "Closed"}
            </span>
          )
        }
      />
      <dl className="space-y-0.5 text-sm max-md:text-xs">
        {rows.slice(0, 4).map((r, i) => (
          <div key={i} className="flex justify-between gap-2">
            <dt className="truncate text-muted">{r.days}</dt>
            <dd className="shrink-0 tabular-nums">{r.hours}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
