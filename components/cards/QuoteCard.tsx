import type { ReactNode } from "react";
import { Quote } from "lucide-react";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Avatar } from "../Header";

export type QuoteCardProps = BaseCard & {
  quote: string;
  name: string;
  /** e.g. "Founder, Studio X" */
  role?: string;
  avatar?: string;
  icon?: ReactNode | string;
};

/** Testimonial: what someone said about you. */
export function QuoteCard({ quote, name, role, avatar = "", icon = <Quote strokeWidth={1.75} />, ...card }: QuoteCardProps) {
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between gap-3 p-4">
      <CardTop left={<CardIcon icon={icon} />} />
      <p className="line-clamp-4 text-[15px] leading-6">{quote}</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="size-8 shrink-0">
          <Avatar name={name} src={avatar} className="size-8" textClass="text-[11px]" />
        </span>
        <span className="leading-5">
          <span className="block">{name}</span>
          {role && <span className="block text-muted">{role}</span>}
        </span>
      </div>
    </Card>
  );
}
