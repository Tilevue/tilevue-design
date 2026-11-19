import { BookOpen } from "lucide-react";
import { Book3D } from "../Book3D";
import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type BookCardProps = BaseCard & {
  /** Empty = a plain book with an icon (cover not found yet) */
  cover?: string;
  title: string;
  author?: string;
  /** The book's subtitle (Google Books), or "294 pages · 2010" when it has none */
  subtitle?: string;
  /** e.g. "Currently reading", "Finished", "All-time favourite" */
  label?: string;
  /** Back-cover colour of the 3D book */
  bookColor?: string;
};

/** A book you're reading: the cover swings open in 3D on hover. */
export function BookCard({ cover, title, author, subtitle, label = "Currently reading", bookColor, ...card }: BookCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          cover ? (
            <Book3D cover={cover} backColor={bookColor} />
          ) : (
            <span className="flex h-16 w-[43px] items-center justify-center rounded-[2px] bg-fill text-subtle shadow-card">
              <BookOpen className="size-5" strokeWidth={1.5} />
            </span>
          )
        }
        right={card.href && <Arrow />}
      />
      <CardText
        title={label}
        subtitle={
          <>
            <span className="line-clamp-3">
              {title}
              {author && ` by ${author}`}
            </span>
            {/* only under a short "Title by Author" (one line) — under a long one it squeezes both into "…" */}
            {subtitle && `${title} by ${author ?? ""}`.length <= 26 && (
              <span className="mt-1.5 line-clamp-2 text-xs leading-4 text-subtle">{subtitle}</span>
            )}
          </>
        }
      />
    </Card>
  );
}
