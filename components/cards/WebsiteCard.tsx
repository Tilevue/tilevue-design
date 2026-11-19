import { Globe } from "lucide-react";
import { Arrow, Card, type BaseCard } from "../Card";

export type WebsiteCardProps = BaseCard & {
  href: string;
  title?: string;
  /** Tall screenshot of the site (filled by the editor, retaken every 14 days) */
  screenshot?: string;
  /** YYYY-MM-DD the screenshot was taken (used by the nightly refresh) */
  shotAt?: string;
};

const host = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
};

/** A website in a little browser window; the screenshot scrolls by itself like a screen recording. globals.css `.site-*` */
export function WebsiteCard({ title, screenshot, shotAt: _shotAt, ...card }: WebsiteCardProps) {
  return (
    <Card {...card} size={card.size ?? "2x2"} hover="none" layout="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2 px-2 pt-1">
        <span className="flex gap-1" aria-hidden>
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-fill px-3 py-0.5 text-center text-xs text-muted">{title || host(card.href) || "yoursite.com"}</span>
        <Arrow className="size-4 text-muted" />
      </div>
      <div className="site-frame relative min-h-0 flex-1 overflow-hidden rounded-[18px] bg-fill shadow-card">
        {screenshot ? (
          <img src={screenshot} alt={`${host(card.href)} preview`} loading="lazy" decoding="async" className="site-shot block w-full" />
        ) : (
          <span className="flex size-full flex-col items-center justify-center gap-2 text-sm text-muted">
            <Globe className="size-6" strokeWidth={1.5} /> {host(card.href) || "Add your website"}
          </span>
        )}
      </div>
    </Card>
  );
}
