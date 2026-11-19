"use client";

import { useState, type ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

export type CampaignMetric = {
  value: string;
  label: string;
};

export type CampaignCardProps = BaseCard & {
  brand: string;
  campaign: string;
  logo?: string;
  metrics: CampaignMetric[];
  quote?: string;
  author?: string;
  icon?: ReactNode | string;
};

/**
 * Brand Campaign Case Study & ROI Card.
 * Proves real performance and conversions to prospective brand partners
 * with key metrics (views, conversions, ROAS) and marketing client testimonials.
 */
export function CampaignCard({
  brand,
  campaign,
  logo,
  metrics = [],
  quote,
  author,
  href,
  icon = <TrendingUp strokeWidth={1.75} />,
  ...card
}: CampaignCardProps) {
  const [open, setOpen] = useState(false);
  const size = card.size ?? "2x1";
  const isSmall = size === "1x1";
  const shownMetrics = metrics.slice(0, isSmall ? 2 : 3);

  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <Card
        {...card}
        href={href}
        size={size}
        hover={card.hover ?? "bg"}
        layout="flex flex-col justify-between p-4"
        onClick={handleClick}
      >
        <CardTop
          left={
            <div className="flex items-center gap-2.5 min-w-0">
              <CardIcon icon={logo || icon} />
              <div className="min-w-0">
                <p className="truncate font-medium text-ink text-sm leading-tight">
                  {brand}
                </p>
                <p className="truncate text-xs text-muted leading-tight">
                  {campaign}
                </p>
              </div>
            </div>
          }
          right={
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge>Case Study</Badge>
              <Arrow />
            </div>
          }
        />

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-fill">
          {shownMetrics.map((m, i) => (
            <div key={i} className="min-w-0">
              <p className="text-base font-semibold tabular-nums text-ink leading-none">
                {m.value}
              </p>
              <p className="mt-1 truncate text-[11px] text-muted">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {quote && size === "2x2" && (
          <div className="mt-2 rounded-xl bg-fill p-3 text-xs">
            <p className="italic text-ink">"{quote}"</p>
            {author && <p className="mt-1 font-medium text-subtle">— {author}</p>}
          </div>
        )}
      </Card>

      {!href && (
        <Popup
          open={open}
          onClose={() => setOpen(false)}
          title={`${brand} · Campaign ROI`}
        >
          <div className="space-y-4 p-1 text-sm">
            <div>
              <h3 className="font-semibold text-ink text-base">{campaign}</h3>
              <p className="text-xs text-muted">Official Brand Partnership with {brand}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-xl bg-fill p-3 text-center">
              {metrics.map((m, i) => (
                <div key={i}>
                  <p className="text-lg font-bold tabular-nums text-ink">{m.value}</p>
                  <p className="text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            {quote && (
              <blockquote className="rounded-xl border-l-2 border-ink bg-fill/50 p-3 text-xs italic text-ink">
                "{quote}"
                {author && (
                  <footer className="mt-1.5 not-italic font-medium text-subtle">
                    — {author}
                  </footer>
                )}
              </blockquote>
            )}
          </div>
        </Popup>
      )}
    </>
  );
}
