import type { ReactNode } from "react";
import { detect } from "@/lib/social";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type LinkCardProps = BaseCard & {
  href: string;
  /** Empty = the network's icon from the link (lib/social.ts), or a link icon */
  icon?: ReactNode | string;
  /** Gray part of the label, e.g. "instagram.com/" */
  prefix?: string;
  /** Dark part of the label, e.g. "tobias" */
  handle: string;
  /** Top-right text (follower count). Shows an arrow when omitted. */
  badge?: string;
};

/** Social profile / external link: icon, follower count or arrow, and a "domain/handle" label. */
export function LinkCard({ icon, prefix, handle, badge, ...card }: LinkCardProps) {
  icon ||= detect(card.href)?.icon ?? "lucide:Link";
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={badge ? <Badge>{badge}</Badge> : card.href && <Arrow />} />
      <p className="truncate text-sm">
        <span className="text-muted">{prefix}</span>
        {prefix && /[\p{L}\p{N}]$/u.test(prefix) && " "}
        {handle}
      </p>
    </Card>
  );
}
