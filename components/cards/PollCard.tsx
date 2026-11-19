"use client";

import { useState, useTransition } from "react";
import { vote } from "@/app/interact";
import type { CardActivity } from "@/lib/store";
import { Badge, Card, CardTop, type BaseCard } from "../Card";
import { interacted } from "../MakeYours";

export type PollCardProps = Omit<BaseCard, "href"> & {
  question: string;
  /** 2–4 answers */
  options: string[];
  /** Filled in by the page (not saved with the card) */
  id?: string;
  page?: string;
  activity?: CardActivity;
};

/** A quick poll with live results. One vote per visitor. */
export function PollCard({ question, options, id, page, activity, ...card }: PollCardProps) {
  const [counts, setCounts] = useState(activity?.counts ?? {});
  const [mine, setMine] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();
  const total = options.reduce((n, o) => n + (counts[o] ?? 0), 0);
  const showResults = !!mine || msg !== "";

  function pick(o: string) {
    if (!page || !id) return setMsg("Voting works on the published page");
    start(async () => {
      const r = await vote(page, id, o);
      if (r.ok) {
        setCounts(r.activity.counts);
        setMine(o);
        interacted();
      } else setMsg(r.error);
    });
  }

  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{question}</span>} right={<Badge>{total === 1 ? "1 vote" : `${total} votes`}</Badge>} />
      <ul className="space-y-1.5">
        {options.slice(0, 4).map((o) => {
          const pct = total ? Math.round(((counts[o] ?? 0) / total) * 100) : 0;
          return (
            <li key={o}>
              <button
                disabled={pending || showResults}
                onClick={() => pick(o)}
                className={`relative flex h-8 w-full cursor-pointer items-center overflow-hidden rounded-full bg-fill px-3 text-left text-sm transition-colors duration-200 ease-smooth enabled:hover:bg-hover-strong disabled:cursor-default ${mine === o ? "ring-2 ring-ink" : ""}`}
              >
                {showResults && (
                  <span className="absolute inset-y-0 left-0 bg-ink/10 transition-[width] duration-700 ease-spring" style={{ width: `${pct}%` }} />
                )}
                <span className="relative min-w-0 flex-1 truncate">{o}</span>
                {showResults && <span className="relative text-xs text-muted tabular-nums">{pct}%</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {msg && <p className="mt-1 text-xs text-subtle">{msg}</p>}
    </Card>
  );
}
