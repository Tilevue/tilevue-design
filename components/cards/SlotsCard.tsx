import type { ReactNode } from "react";
import { CalendarCheck } from "lucide-react";
import { Arrow, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type SlotsCardProps = BaseCard & {
  /** e.g. ["Tue 10:00", "Tue 14:30", "Wed 09:00"] */
  slots: string[];
  title: string;
  subtitle?: string;
  icon?: ReactNode | string;
};

/** Next free appointment times as pills, linking to the booking page. */
export function SlotsCard({ slots, title, subtitle, icon = <CalendarCheck strokeWidth={1.75} />, ...card }: SlotsCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={card.href && <Arrow />} />
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {slots.slice(0, 4).map((s, i) => (
            <span
              key={i}
              className={`rounded-full px-2.5 py-1 text-xs tabular-nums transition-colors duration-200 ease-smooth ${i === 0 ? "bg-ink text-page" : "bg-fill"}`}
            >
              {s}
            </span>
          ))}
        </div>
        <CardText title={title} subtitle={subtitle} />
      </div>
    </Card>
  );
}
