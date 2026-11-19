import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

const dots = {
  available: "bg-emerald-500",
  busy: "bg-amber-500",
  away: "bg-subtle",
};

export type StatusCardProps = BaseCard & {
  status: keyof typeof dots;
  title: string;
  subtitle?: string;
};

/** "Available for work" with a live dot (pulses while available). */
export function StatusCard({ status = "available", title, subtitle, ...card }: StatusCardProps) {
  const dot = dots[status] ?? dots.available;
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="card-icon relative flex size-5 items-center justify-center" aria-label={status}>
            {status === "available" && <span className={`absolute size-3 animate-ping rounded-full opacity-40 ${dot}`} />}
            <span className={`relative size-2.5 rounded-full ${dot}`} />
          </span>
        }
        right={card.href && <Arrow />}
      />
      <CardText title={title} subtitle={subtitle} />
    </Card>
  );
}
