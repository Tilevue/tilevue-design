import { Mic } from "lucide-react";
import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type PodcastCardProps = BaseCard & {
  /** Empty = an icon tile (artwork not found yet) */
  cover?: string;
  title: string;
  /** Host / publisher */
  author?: string;
  /** e.g. "Listening to" */
  label?: string;
};

/** A podcast you listen to: square artwork that tilts on hover. */
export function PodcastCard({ cover, title, author, label = "Listening to", ...card }: PodcastCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          cover ? (
            <img src={cover} alt="" className="size-16 rounded-xl object-cover shadow-card transition-transform duration-200 ease-smooth group-hover:-rotate-3" />
          ) : (
            <span className="flex size-16 items-center justify-center rounded-xl bg-fill text-subtle shadow-card">
              <Mic className="size-5" strokeWidth={1.5} />
            </span>
          )
        }
        right={card.href && <Arrow />}
      />
      <CardText
        title={label}
        subtitle={
          <span className="line-clamp-2">
            {title}
            {author && <span className="text-subtle"> · {author}</span>}
          </span>
        }
      />
    </Card>
  );
}
