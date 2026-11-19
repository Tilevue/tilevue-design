"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, PackageOpen } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

export type GiftingCardProps = BaseCard & {
  title?: string;
  subtitle?: string;
  attention?: string;
  address: string;
  preferences?: string;
  note?: string;
  icon?: ReactNode | string;
};

/**
 * PR Package & Gifting Card.
 * Allows brand managers and PR agencies to view courier instructions,
 * copy the studio address in 1 tap, and inspect sizing preferences.
 */
export function GiftingCard({
  title = "PR & Gifting",
  subtitle = "Send products for review",
  attention = "Attn: Creator Studio PR",
  address,
  preferences,
  note = "Gifting does not guarantee dedicated coverage.",
  icon = <PackageOpen strokeWidth={1.75} />,
  ...card
}: GiftingCardProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const fullText = attention ? `${attention}\n${address}` : address;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <Card
        {...card}
        size={card.size ?? "1x1"}
        hover={card.hover ?? "bg"}
        layout="cursor-pointer p-0"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-full cursor-pointer flex-col justify-between p-4 text-left"
        >
          <CardTop
            left={<CardIcon icon={icon} />}
            right={
              <div className="flex items-center gap-1.5">
                <Badge>PR Box</Badge>
                <Arrow />
              </div>
            }
          />

          <div className="space-y-1">
            <h3 className="font-medium text-ink leading-snug">{title}</h3>
            {attention && (
              <p className="truncate text-xs text-muted font-mono">{attention}</p>
            )}
            {preferences && (
              <p className="line-clamp-2 pt-1 text-[11px] text-subtle leading-tight">
                {preferences}
              </p>
            )}
          </div>
        </button>
      </Card>

      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        footer={
          <button
            type="button"
            onClick={() => copyAddress()}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink font-medium text-page transition-transform active:scale-[0.98] cursor-pointer"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Address Copied to Clipboard!" : "Copy Full Shipping Address"}
          </button>
        }
      >
        <div className="space-y-4 p-1 text-sm">
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}

          <div className="rounded-xl bg-fill p-3.5">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Delivery Address</span>
              <button
                type="button"
                onClick={copyAddress}
                className="flex items-center gap-1 font-medium text-ink hover:underline cursor-pointer"
              >
                {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {attention && (
              <p className="mt-1.5 font-medium text-ink">{attention}</p>
            )}
            <p className="mt-1 whitespace-pre-wrap font-mono text-xs text-muted leading-relaxed">
              {address}
            </p>
          </div>

          {preferences && (
            <div>
              <h4 className="text-xs font-medium text-muted">Sizing & Category Preferences</h4>
              <p className="mt-1 rounded-xl bg-fill p-3 text-xs text-ink leading-relaxed">
                {preferences}
              </p>
            </div>
          )}

          {note && (
            <p className="text-xs text-subtle italic">
              ℹ️ {note}
            </p>
          )}
        </div>
      </Popup>
    </>
  );
}
