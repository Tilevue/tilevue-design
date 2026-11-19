"use client";

import { useState } from "react";
import { Card, type BaseCard } from "../Card";

export type CompareCardProps = Omit<BaseCard, "href"> & {
  before: string;
  after: string;
  /** Show the "before" photo in black & white (e.g. to show a colour grade with one photo) */
  beforeMono?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
};

/** Before / after: drag the divider to compare two photos. */
export function CompareCard({ before, after, beforeMono, beforeLabel = "Before", afterLabel = "After", ...card }: CompareCardProps) {
  const [pos, setPos] = useState(50);
  const pill = "absolute top-3 z-10 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur";

  return (
    <Card {...card} size={card.size ?? "2x2"} layout="select-none">
      <img src={after} alt={afterLabel} className="absolute inset-0 size-full object-cover" />
      <img
        src={before}
        alt={beforeLabel}
        className={`absolute inset-0 size-full object-cover ${beforeMono ? "grayscale" : ""}`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className={`${pill} left-3`}>{beforeLabel}</span>
      <span className={`${pill} right-3`}>{afterLabel}</span>
      {/* divider + knob */}
      <span className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_6px_rgb(0_0_0/0.3)]" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 flex size-8 -translate-1/2 items-center justify-center rounded-full bg-white text-xs text-black shadow-card transition-transform duration-300 ease-spring group-hover:scale-110">
          ⟷
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Compare before and after"
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-20 size-full cursor-ew-resize opacity-0"
      />
    </Card>
  );
}
