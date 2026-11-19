import { Card, CardText, type BaseCard } from "../Card";

type Photo = { src: string; caption?: string };

export type PolaroidCardProps = BaseCard & {
  /** Up to 3 photos */
  photos: Photo[];
  title?: string;
};

// resting tilt, and where each print slides to when the card is hovered
const poses = [
  "-translate-x-[45%] -rotate-[8deg] group-hover:-translate-x-[85%] group-hover:-rotate-12",
  "rotate-2 group-hover:-translate-y-1.5 group-hover:rotate-0",
  "translate-x-[45%] rotate-[7deg] group-hover:translate-x-[85%] group-hover:rotate-12",
];

/** A little stack of polaroids that fans out on hover. */
export function PolaroidCard({ photos, title, ...card }: PolaroidCardProps) {
  const prints = photos.slice(0, 3);
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-end p-4">
      <div className="absolute inset-x-0 top-4 bottom-10 flex items-center justify-center">
        {prints.map((p, i) => (
          <figure
            key={i}
            className={`absolute aspect-[0.85] h-[92%] bg-white p-1.5 pb-0 shadow-[0_2px_10px_rgb(0_0_0/0.15)] transition-[translate,rotate] duration-500 ease-spring ${poses[i + (3 - prints.length)]}`}
            style={{ zIndex: i === 1 ? 3 : i }}
          >
            <img src={p.src} alt={p.caption ?? ""} loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="truncate py-1 text-center font-mono text-[10px] text-neutral-600">{p.caption || " "}</figcaption>
          </figure>
        ))}
      </div>
      {title && <CardText title={title} className="text-center" />}
    </Card>
  );
}
