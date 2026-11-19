import type { CSSProperties, ReactNode } from "react";
import { Clock } from "lucide-react";
import { Arrow, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";
import { Media } from "../Media";

export type MediaCardProps = BaseCard & {
  /** Background image or .mp4 */
  media: string;
  /** Icon path, or any node rendered as-is in the top-left corner */
  icon?: ReactNode | string;
  title: string;
  subtitle?: string;
  /** Pill in the top-right corner, e.g. a video duration "3:20". Shows an arrow when omitted (and href is set). */
  duration?: string;
  /** Extra content above the title (rating, poster…) */
  children?: ReactNode;
  /** Background opacity on hover (text stays bright). Original: 0.8, video cards 0.6. */
  hoverOpacity?: number;
  /** Object position for background image / video (defaults to object-top so faces are never cut off) */
  position?: string;
};

/** Photo / video background with white text over a bottom gradient. */
export function MediaCard({ media, icon, title, subtitle, duration, children, hoverOpacity = 0.8, position = "object-top", ...card }: MediaCardProps) {
  return (
    <Card {...card} hover={card.hover ?? "none"} layout="flex flex-col justify-between p-4">
      <div
        className="absolute inset-0 transition-opacity duration-200 ease-smooth group-hover:opacity-(--hover-opacity)"
        style={{ "--hover-opacity": hoverOpacity } as CSSProperties}
      >
        <Media src={media} className={position} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/70" />
      </div>
      <CardTop
        left={typeof icon === "string" ? <CardIcon icon={icon} className="rounded" /> : icon}
        right={
          duration ? (
            <span className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 font-mono text-xs font-medium text-white backdrop-blur">
              <Clock className="size-3.5" /> {duration}
            </span>
          ) : (
            card.href && <Arrow className="text-white" />
          )
        }
      />
      <div className="relative z-10">
        {children}
        <CardText title={title} subtitle={subtitle} light />
      </div>
    </Card>
  );
}
