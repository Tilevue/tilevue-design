"use client";

import { useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

export type VideoCardProps = Omit<BaseCard, "href"> & {
  /** Any YouTube link: watch?v=, youtu.be/, shorts/ */
  url: string;
  title: string;
  subtitle?: string;
  /** Pill top-right, e.g. "3:20" */
  duration?: string;
  icon?: ReactNode | string;
};

export function youTubeId(url: string): string | null {
  return url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/)?.[1] ?? null;
}

/** YouTube video: thumbnail + play button; plays in a popup without leaving the page. */
export function VideoCard({ url, title, subtitle, duration, icon = "/icons/youtube.svg", ...card }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const id = youTubeId(url);

  return (
    <>
      <Card {...card} size={card.size ?? "2x1"} layout="p-0">
        <button
          onClick={() => id && setOpen(true)}
          aria-label={`Play ${title}`}
          className="flex size-full cursor-pointer flex-col justify-between bg-black p-4 text-left"
        >
          {id && (
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-opacity duration-200 ease-smooth group-hover:opacity-80"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/70" />
          <CardTop
            left={<CardIcon icon={icon} className="rounded" />}
            right={
              duration && (
                <span className="rounded-full bg-black/40 px-2 py-0.5 font-mono text-xs font-medium text-white backdrop-blur">{duration}</span>
              )
            }
          />
          <span className="absolute top-1/2 left-1/2 flex size-12 -translate-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-card backdrop-blur transition-transform duration-300 ease-spring group-hover:scale-110">
            <Play className="ml-0.5 size-5 fill-current" />
          </span>
          <CardText title={title} subtitle={subtitle} light />
        </button>
      </Card>

      {id && (
        <Popup open={open} onClose={() => setOpen(false)} title={title} wide>
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="aspect-video w-full rounded-xl"
            />
          )}
        </Popup>
      )}
    </>
  );
}
