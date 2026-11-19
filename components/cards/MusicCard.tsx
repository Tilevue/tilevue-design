import type { ReactNode } from "react";
import { musicApp } from "@/lib/social";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type MusicCardProps = BaseCard & {
  icon?: ReactNode | string;
  artist: string;
  track: string;
  /** Round artwork, shown as a record peeking from the bottom (spins on hover) */
  cover: string;
};

/** The icon follows the link: a Spotify song shows Spotify, an Amazon Music song shows Amazon Music… */
export function MusicCard({ icon = "/icons/spotify.svg", artist, track, cover, ...card }: MusicCardProps) {
  return (
    <Card {...card} layout="p-4">
      <CardTop
        left={<CardIcon icon={musicApp(card.href)?.icon ?? icon} />}
        right={
          // equalizer: faint at rest, plays on hover
          <span
            className="flex size-5 items-center justify-center gap-[3px] opacity-20 transition-opacity duration-200 ease-smooth group-hover:opacity-100"
            aria-hidden
          >
            {[0.9, 0.6, 0.75, 0.5].map((d, i) => (
              <span
                key={i}
                className="h-3.5 w-0.5 rounded-full bg-ink group-hover:animate-wave"
                style={{ animationDuration: `${d}s` }}
              />
            ))}
          </span>
        }
      />
      <div className="relative z-10 mt-5 text-sm">
        <p className="text-muted">{artist}</p>
        <p className="font-medium text-ink">{track}</p>
      </div>
      {/* record peeking from the bottom: spins while hovered, stops where it is on leave */}
      <div className="absolute top-[max(52%,104px)] left-0 aspect-square w-full animate-record [animation-play-state:paused] group-hover:[animation-play-state:running]">
        <img src={cover} alt="" className="size-full rounded-full object-cover" />
        <div className="absolute top-1/2 left-1/2 size-[30.5%] -translate-1/2 rounded-full bg-card" />
        <img src="/icons/vinyl-center.svg" alt="" className="absolute top-1/2 left-1/2 size-[35.5%] -translate-1/2" />
      </div>
    </Card>
  );
}
