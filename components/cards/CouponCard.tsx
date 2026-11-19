"use client";

import { useState } from "react";
import { Check, Copy, TicketPercent } from "lucide-react";
import { Badge, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type CouponCardProps = Omit<BaseCard, "href"> & {
  code: string;
  /** e.g. "−20%" */
  discount?: string;
  title: string;
  /** e.g. "Until Aug 31" */
  subtitle?: string;
};

/** Discount code on a dashed ticket. Click to copy. */
export function CouponCard({ code, discount, title, subtitle, ...card }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card {...card} hover={card.hover ?? "bg-strong"} layout="p-0">
      <button onClick={copy} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
        <CardTop left={<CardIcon icon={<TicketPercent strokeWidth={1.75} />} />} right={discount && <Badge>{discount}</Badge>} />
        <span className="flex items-center justify-between gap-2 rounded-xl border-[1.5px] border-dashed border-ink/20 px-3 py-2">
          <span className="truncate font-mono text-sm font-medium tracking-wider">{copied ? "Copied!" : code}</span>
          {copied ? <Check className="size-4 shrink-0 text-emerald-500" /> : <Copy className="size-4 shrink-0 text-muted" strokeWidth={1.75} />}
        </span>
        <CardText title={title} subtitle={subtitle} />
      </button>
    </Card>
  );
}
