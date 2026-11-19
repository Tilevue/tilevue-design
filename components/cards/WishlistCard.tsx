"use client";

import { useState } from "react";
import { Check, Gift } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

type Wish = { name: string; price?: string; image?: string; href?: string; got?: boolean };

export type WishlistCardProps = Omit<BaseCard, "href"> & {
  title?: string;
  items: Wish[];
};

function Row({ w, big }: { w: Wish; big?: boolean }) {
  const body = (
    <>
      <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-fill ${big ? "size-12" : "size-7"}`}>
        {w.image ? <img src={w.image} alt="" className="size-full object-contain" /> : <Gift className="size-4 text-muted" strokeWidth={1.75} />}
      </span>
      <span className={`min-w-0 flex-1 truncate ${w.got ? "text-subtle line-through" : ""}`}>{w.name}</span>
      {w.got ? <Check className="size-4 text-emerald-500" /> : w.price && <span className="shrink-0 text-muted tabular-nums">{w.price}</span>}
      {big && w.href && !w.got && <Arrow className="size-4 text-muted" />}
    </>
  );
  const cls = `flex items-center gap-3 rounded-xl text-sm ${big ? "p-2" : ""}`;
  return big && w.href && !w.got ? (
    <a href={w.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors duration-200 ease-smooth hover:bg-fill`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Gift ideas (birthday, wedding…). Already-given items are ticked off. */
export function WishlistCard({ title = "Wishlist", items, ...card }: WishlistCardProps) {
  const [open, setOpen] = useState(false);
  const left = items.filter((w) => !w.got).length;
  return (
    <>
      <Card {...card} size={card.size ?? "2x1"} hover={card.hover ?? "bg"} layout="p-0">
        <button onClick={() => setOpen(true)} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
          <CardTop
            left={
              <span className="flex items-center gap-2 text-sm">
                <CardIcon icon={<Gift strokeWidth={1.75} />} /> {title}
              </span>
            }
            right={<Badge>{left} left</Badge>}
          />
          <div className="space-y-1.5">
            {items.slice(0, 3).map((w, i) => (
              <Row key={i} w={w} />
            ))}
          </div>
        </button>
      </Card>
      <Popup open={open} onClose={() => setOpen(false)} title={title} count={items.length}>
        {items.map((w, i) => (
          <Row key={i} w={w} big />
        ))}
      </Popup>
    </>
  );
}
