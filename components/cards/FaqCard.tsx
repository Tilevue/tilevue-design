"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight, CircleHelp } from "lucide-react";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

type QA = { q: string; a: string };

export type FaqCardProps = Omit<BaseCard, "href"> & {
  title: string;
  items: QA[];
  icon?: ReactNode | string;
};

/** Frequently asked questions. The card lists the first few; the popup has every answer. */
export function FaqCard({ title, items, icon = <CircleHelp strokeWidth={1.75} />, ...card }: FaqCardProps) {
  const [open, setOpen] = useState<number | null>(null);
  const wide = (card.size ?? "2x1") !== "1x1";
  const shown = items.slice(0, wide ? 3 : 2);

  return (
    <>
      <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
        <CardTop
          left={
            <span className="flex items-center gap-2 text-sm">
              <CardIcon icon={icon} /> {title}
            </span>
          }
          right={<span className="text-sm text-subtle">{items.length}</span>}
        />
        <ul className="-mx-2 text-sm">
          {shown.map((it, i) => (
            <li key={i}>
              <button
                onClick={() => setOpen(i)}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors duration-200 ease-smooth hover:bg-fill"
              >
                <span className="min-w-0 flex-1 truncate">{it.q}</span>
                <ChevronRight className="size-4 shrink-0 text-subtle" />
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Popup open={open !== null} onClose={() => setOpen(null)} title={title} count={items.length}>
        <div className="divide-y divide-ring">
          {items.map((it, i) => (
            // native <details>: accessible, works without JS; the clicked question starts open
            <details key={`${open}-${i}`} open={i === open} className="group/qa px-2 py-1">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{it.q}</span>
                <ChevronRight className="size-4 shrink-0 text-subtle transition-transform duration-200 group-open/qa:rotate-90" />
              </summary>
              <p className="pb-3 text-sm whitespace-pre-line text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </Popup>
    </>
  );
}
