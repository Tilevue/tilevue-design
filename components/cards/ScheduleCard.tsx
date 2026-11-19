"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CalendarRange } from "lucide-react";
import { Arrow, Card, CardIcon, CardTop, type BaseCard } from "../Card";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Session = { day: string; name: string; time: string; note?: string };

export type ScheduleCardProps = BaseCard & {
  title: string;
  /** day: "Mon"…"Sun" */
  sessions: Session[];
  icon?: ReactNode | string;
};

/** Weekly timetable — classes, office hours, live streams. Today's rows are highlighted. */
export function ScheduleCard({ title, sessions, icon = <CalendarRange strokeWidth={1.75} />, ...card }: ScheduleCardProps) {
  const [today, setToday] = useState<string | null>(null); // visitor's weekday, set in the browser
  useEffect(() => setToday(DAYS[new Date().getDay()]), []);

  const wide = (card.size ?? "2x1") !== "1x1";
  // upcoming first: rotate the week so today leads
  const order = (d: string) => (DAYS.indexOf(d) - (today ? DAYS.indexOf(today) : 1) + 7) % 7;
  const rows = [...sessions].sort((a, b) => order(a.day) - order(b.day) || a.time.localeCompare(b.time)).slice(0, wide ? 4 : 3);

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
      <ul className="-mx-2 text-sm">
        {rows.map((s, i) => {
          const isToday = s.day === today;
          return (
            <li key={i} className={`flex items-center gap-3 rounded-lg px-2 py-0.5 ${isToday ? "bg-fill" : ""}`}>
              <span className={`w-9 shrink-0 font-mono text-xs uppercase ${isToday ? "text-ink" : "text-subtle"}`}>{s.day}</span>
              <span className="min-w-0 flex-1 truncate">
                {s.name}
                {wide && s.note && <span className="text-muted"> · {s.note}</span>}
              </span>
              <span className="shrink-0 text-muted tabular-nums">{s.time}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
