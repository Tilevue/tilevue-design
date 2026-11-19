import { Star } from "lucide-react";
import { Card, CardText, CardTop, type BaseCard } from "../Card";

export type AppCardProps = BaseCard & {
  /** App icon (square image) */
  appIcon: string;
  name: string;
  /** e.g. "Photo & Video" */
  subtitle?: string;
  /** 0–5, shown as "★ 4.8" */
  rating?: number;
  /** Pill text, e.g. "Get", "Free", "$4.99" */
  cta?: string;
};

/** An app with an App Store–style "Get" pill. Icon tilts on hover like the podcast cover. */
export function AppCard({ appIcon, name, subtitle, rating, cta = "Get", ...card }: AppCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <img
            src={appIcon}
            alt=""
            className="size-14 rounded-[14px] object-cover shadow-card transition-transform duration-200 ease-smooth group-hover:-rotate-3"
          />
        }
        right={
          <span className="inline-flex h-7 items-center rounded-full bg-fill px-3 text-xs font-semibold text-accent">{cta}</span>
        }
      />
      <div className="space-y-1">
        {rating !== undefined && (
          <span className="flex items-center gap-1 text-sm text-subtle">
            <Star className="size-3.5 fill-current" /> {rating.toFixed(1)}
          </span>
        )}
        <CardText title={name} subtitle={subtitle} />
      </div>
    </Card>
  );
}
