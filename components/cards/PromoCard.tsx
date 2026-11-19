"use client";

import { useState } from "react";
import { Check, Copy, TicketPercent } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type PromoCardProps = BaseCard & {
  href: string;
  brand: string;
  code: string;
  discount: string;
  subtitle?: string;
  logo?: string;
};

/** Brand promo card: dashed ticket with 1-tap copy, clicking the card opens the store. */
export function PromoCard({
  href,
  brand,
  code,
  discount,
  subtitle,
  logo,
  ...card
}: PromoCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Card
      {...card}
      href={href}
      size={card.size ?? "1x1"}
      layout="flex flex-col justify-between p-4"
    >
      <CardTop
        left={<CardIcon icon={logo || <TicketPercent strokeWidth={1.75} />} />}
        right={
          <div className="flex items-center gap-2">
            {discount && <Badge>{discount}</Badge>}
            <Arrow />
          </div>
        }
      />

      <button
        type="button"
        onClick={copy}
        title="Copy code"
        className="flex items-center justify-between gap-2 rounded-xl border-[1.5px] border-dashed border-ink/20 px-3 py-2 transition-colors duration-200 ease-smooth hover:border-ink/40 cursor-pointer"
      >
        <span className="truncate font-mono text-sm font-medium tracking-wider text-ink">
          {copied ? "Copied!" : code}
        </span>
        {copied ? (
          <Check className="size-4 shrink-0 text-emerald-500" />
        ) : (
          <Copy className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
        )}
      </button>

      <CardText title={brand} subtitle={subtitle} />
    </Card>
  );
}
