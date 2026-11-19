import { Plane } from "lucide-react";
import { Card, CardText, type BaseCard } from "../Card";

export type JourneyCardProps = BaseCard & {
  from: string;
  fromFlag?: string;
  to: string;
  toFlag?: string;
  /** e.g. "Since 2019" */
  note?: string;
};

/** Hometown → where you live now, joined by a dotted arc. The plane flies across on hover. */
export function JourneyCard({ from, fromFlag, to, toFlag, note, ...card }: JourneyCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <div className="relative mt-2 h-16">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-2 top-3 h-10 w-[calc(100%-16px)] overflow-visible">
          <path d="M2 36 Q 50 -14 98 36" fill="none" className="stroke-ink/25" strokeWidth="1.2" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* plane at the top of the arc, glides forward on hover */}
        <Plane
          className="absolute top-0 left-1/2 size-4 -translate-x-1/2 rotate-45 text-ink transition-[translate] duration-700 ease-spring group-hover:translate-x-[calc(-50%+14px)] group-hover:translate-y-0.5"
          strokeWidth={1.75}
        />
        <span className="absolute bottom-0 left-0 text-xl leading-none">{fromFlag}</span>
        <span className="absolute right-0 bottom-0 text-xl leading-none">{toFlag}</span>
      </div>
      <CardText title={<>{from} → {to}</>} subtitle={note} />
    </Card>
  );
}
