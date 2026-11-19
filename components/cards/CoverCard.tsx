import { Book3D } from "../Book3D";
import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type CoverCardProps = BaseCard & {
  cover: string;
  /** "book" = 3D book that opens on hover, "square" = podcast / album art that tilts on hover */
  shape?: "book" | "square";
  /** Back-cover colour of the 3D book */
  bookColor?: string;
  label: string;
  title: string;
};

/** "Current read", "Current podcast"… a cover with a label and title. */
export function CoverCard({ cover, shape = "square", bookColor, label, title, ...card }: CoverCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          shape === "book" ? (
            <Book3D cover={cover} backColor={bookColor} />
          ) : (
            <img
              src={cover}
              alt=""
              className="size-16 rounded-xl object-cover shadow-card transition-transform duration-200 ease-smooth group-hover:-rotate-3"
            />
          )
        }
        right={card.href && <Arrow />}
      />
      <CardText title={label} subtitle={title} />
    </Card>
  );
}
