"use client";

import { useState, type ReactNode } from "react";
import { BadgeDollarSign } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

export type RatePackage = {
  name: string;
  price: string;
  deliverable?: string;
  badge?: string;
};

export type RatesCardProps = Omit<BaseCard, "href"> & {
  title?: string;
  subtitle?: string;
  packages: RatePackage[];
  note?: string;
  href?: string;
  icon?: ReactNode | string;
};

/**
 * Sponsorship Rates & Deliverables Card.
 * Compact bento tile showing primary deliverables and pricing pills;
 * clicking expands into a full rate sheet popup with deliverable specs and booking CTA.
 */
export function RatesCard({
  title = "Sponsorship Rates",
  subtitle = "Deliverables & starting rates",
  packages = [],
  note = "Custom packages and whitelisting available upon request.",
  href,
  icon = <BadgeDollarSign strokeWidth={1.75} />,
  ...card
}: RatesCardProps) {
  const [open, setOpen] = useState(false);
  const size = card.size ?? "2x1";
  const isSmall = size === "1x1";
  const shown = packages.slice(0, isSmall ? 2 : 3);

  return (
    <>
      <Card {...card} size={size} hover={card.hover ?? "bg"} layout="p-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-full cursor-pointer flex-col justify-between p-4 text-left"
        >
          <CardTop
            left={
              <span className="flex items-center gap-2 text-sm font-medium">
                <CardIcon icon={icon} />
                <span className="truncate">{title}</span>
              </span>
            }
            right={
              <div className="flex items-center gap-2">
                <Badge>Media Kit</Badge>
                <Arrow />
              </div>
            }
          />

          <ul className="space-y-1.5 text-sm">
            {shown.map((pkg, i) => (
              <li key={i} className="flex items-baseline justify-between gap-2">
                <span className="truncate font-medium text-ink">
                  {pkg.name}
                  {pkg.deliverable && !isSmall && (
                    <span className="ml-1.5 hidden font-normal text-muted sm:inline">
                      · {pkg.deliverable}
                    </span>
                  )}
                </span>
                <span className="min-w-3 flex-1 translate-y-[-3px] border-b border-dotted border-subtle/30" />
                <span className="shrink-0 font-medium tabular-nums text-ink">
                  {pkg.price}
                </span>
              </li>
            ))}
            {packages.length > shown.length && (
              <li className="pt-0.5 text-xs text-muted">
                +{packages.length - shown.length} more packages & add-ons
              </li>
            )}
          </ul>
        </button>
      </Card>

      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        count={packages.length}
        footer={
          href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex h-11 w-full items-center justify-center rounded-xl bg-ink font-medium text-page transition-transform duration-150 active:scale-[0.98]"
            >
              Inquire for Sponsorship
            </a>
          ) : undefined
        }
      >
        <div className="space-y-3 p-1">
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
          <ul className="divide-y divide-fill">
            {packages.map((pkg, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink">{pkg.name}</span>
                    {pkg.badge && <Badge>{pkg.badge}</Badge>}
                  </div>
                  {pkg.deliverable && (
                    <p className="mt-0.5 text-xs text-muted">{pkg.deliverable}</p>
                  )}
                </div>
                <span className="shrink-0 font-semibold tabular-nums text-ink">
                  {pkg.price}
                </span>
              </li>
            ))}
          </ul>
          {note && (
            <div className="mt-3 rounded-xl bg-fill p-3 text-xs text-muted">
              {note}
            </div>
          )}
        </div>
      </Popup>
    </>
  );
}
