import { Gamepad2 } from "lucide-react";
import { Badge, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type GameCardProps = BaseCard & {
  game: string;
  /** "playing" (live dot), "recent", "finished", "favourite" */
  status?: "playing" | "recent" | "finished" | "favourite";
  /** e.g. "PS5", "PC", "Switch" */
  platform?: string;
  /** e.g. "Diamond II" */
  rank?: string;
  /** e.g. "312 h played" */
  hours?: string;
  /** Box art (portrait works best) */
  cover?: string;
};

const STATUS = { playing: "Playing now", recent: "Recently played", finished: "Finished", favourite: "All-time favourite" };

/** The game you're playing (or played), with box art, rank and hours. */
export function GameCard({ game, status, platform, rank, hours, cover, ...card }: GameCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          cover ? (
            <img src={cover} alt="" className="h-[68px] w-[52px] rounded-lg object-cover shadow-card transition-transform duration-200 ease-smooth group-hover:-rotate-3" />
          ) : (
            <CardIcon icon={<Gamepad2 strokeWidth={1.75} />} />
          )
        }
        right={platform && <Badge>{platform}</Badge>}
      />
      <div className="space-y-2">
        {rank && (
          <span className="inline-flex rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            {rank}
          </span>
        )}
        <div className="text-sm">
          {status && (
            <p className="flex items-center gap-1.5 text-xs text-muted">
              {status === "playing" && (
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-emerald-500" />
                </span>
              )}
              {STATUS[status]}
            </p>
          )}
          <CardText title={<span className="line-clamp-2">{game}</span>} subtitle={hours} />
        </div>
      </div>
    </Card>
  );
}
