"use client";

import { useState, type ReactNode } from "react";
import { Receipt } from "lucide-react";
import { Arrow, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

type Row = { name: string; price: string; note?: string };

export type PricesCardProps = Omit<BaseCard, "href"> & {
  title: string;
  items: Row[];
  icon?: ReactNode | string;
};

/** Services or a menu with prices. Shows the first few; the full list opens in a popup. */
export function PricesCard({ title, items, icon = <Receipt strokeWidth={1.75} />, ...card }: PricesCardProps) {
  const [open, setOpen] = useState(false);
  const wide = (card.size ?? "2x1") !== "1x1";
  const shown = items.slice(0, wide ? 3 : 2);

  return (
    <>
      <Card {...card} size={card.size ?? "2x1"} hover={card.hover ?? "bg"} layout="p-0">
        <button onClick={() => setOpen(true)} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
          <CardTop
            left={
              <span className="flex items-center gap-2 text-sm">
                <CardIcon icon={icon} /> {title}
              </span>
            }
            right={<Arrow />}
          />
          <ul className="space-y-1 text-sm">
            {shown.map((r, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="truncate">{r.name}</span>
                <span className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-subtle/40" />
                <span className="shrink-0 text-muted tabular-nums">{r.price}</span>
              </li>
            ))}
            {items.length > shown.length && <li className="text-subtle">+{items.length - shown.length} more</li>}
          </ul>
        </button>
      </Card>

      <Popup open={open} onClose={() => setOpen(false)} title={title} count={items.length}>
        <ul>
          {items.map((r, i) => (
            <li key={i} className="flex items-center gap-4 rounded-xl p-3 text-sm leading-6">
              <span className="flex-1">
                <span className="block font-medium">{r.name}</span>
                {r.note && <span className="block text-muted">{r.note}</span>}
              </span>
              <span className="shrink-0 font-medium tabular-nums">{r.price}</span>
            </li>
          ))}
        </ul>
      </Popup>
    </>
  );
}
