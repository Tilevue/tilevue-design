"use client";

import { useState, useTransition } from "react";
import { react } from "@/app/interact";
import type { CardActivity } from "@/lib/store";
import { Card, CardText, type BaseCard } from "../Card";
import { interacted } from "../MakeYours";

export type ReactionsCardProps = Omit<BaseCard, "href"> & {
  title?: string;
  /** Up to 4 emoji */
  emojis: string[];
  id?: string;
  page?: string;
  activity?: CardActivity;
};

/** Emoji reactions with live counts. One per visitor; tap again to undo. */
export function ReactionsCard({ title = "Say hi", emojis, id, page, activity, ...card }: ReactionsCardProps) {
  const [counts, setCounts] = useState(activity?.counts ?? {});
  const [mine, setMine] = useState<string | undefined>();
  const [bump, setBump] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function tap(e: string) {
    if (!page || !id) return;
    setBump(e);
    start(async () => {
      const r = await react(page, id, e);
      if (r.ok) {
        setCounts(r.activity.counts);
        setMine(r.mine);
        if (r.mine) interacted();
      }
      setTimeout(() => setBump(null), 300);
    });
  }

  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <div className="grid grid-cols-2 gap-1.5">
        {emojis.slice(0, 4).map((e) => (
          <button
            key={e}
            onClick={() => tap(e)}
            disabled={pending}
            aria-label={`React ${e}`}
            className={`flex h-12 cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-fill transition-colors duration-200 ease-smooth hover:bg-hover-strong ${mine === e ? "ring-2 ring-ink" : ""}`}
          >
            <span className={`text-xl leading-none transition-transform duration-300 ease-spring ${bump === e ? "scale-150" : ""}`}>{e}</span>
            <span className="text-xs text-muted tabular-nums">{counts[e] ?? 0}</span>
          </button>
        ))}
      </div>
      <CardText title={title} />
    </Card>
  );
}
