import { Quote } from "lucide-react";
import { Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

type Q = { text: string; author?: string };

export type DailyQuoteCardProps = BaseCard & {
  quotes: Q[];
};

/** A different quote every day, set large and faded like the header name (it darkens on hover). */
export function DailyQuoteCard({ quotes, ...card }: DailyQuoteCardProps) {
  if (!quotes.length) return null;
  const day = Math.floor(Date.now() / 86_400_000); // same quote for everyone on a given (UTC) day
  const q = quotes[day % quotes.length];
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={<Quote strokeWidth={1.75} />} />} right={<Badge>Quote of the day</Badge>} />
      <figure className="space-y-2">
        <blockquote className="line-clamp-3 text-xl leading-7 font-semibold tracking-[-0.01em] text-ink/40 transition-colors duration-300 ease-smooth group-hover:text-ink/80">
          “{q.text}”
        </blockquote>
        {q.author && <figcaption className="text-sm text-muted">— {q.author}</figcaption>}
      </figure>
    </Card>
  );
}
