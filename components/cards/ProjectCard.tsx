import type { ReactNode } from "react";
import { Arrow, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";
import { Media } from "../Media";

export type ProjectCardProps = BaseCard & {
  icon: ReactNode | string;
  title: string;
  subtitle?: string;
  /** Image or .mp4 shown on the right half */
  media: string;
  /** "screen" = browser-style panel flush to the edge; "object" = cut-out image (no panel) */
  variant?: "screen" | "object";
};

/** Wide card: text on the left, product video / screenshot on the right. */
export function ProjectCard({ icon, title, subtitle, media, variant = "screen", ...card }: ProjectCardProps) {
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={card.href && variant === "object" && <Arrow />} />
      {variant === "screen" ? (
        <div className="absolute top-4 right-0 bottom-0 left-[42%] overflow-hidden rounded-tl-xl shadow-card">
          <Media src={media} />
        </div>
      ) : (
        <div className="absolute top-0 right-0 bottom-0 left-[50%] transition-transform duration-300 ease-spring group-hover:-translate-y-0.5">
          <Media src={media} className="object-left" />
        </div>
      )}
      <CardText title={title} subtitle={subtitle} className="max-w-[40%]" />
    </Card>
  );
}
