import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { StoredIcon } from "./icons";

export type CardSize = "1x1" | "2x1" | "2x2";

/** Props every card accepts on top of its own. */
export type BaseCard = {
  size?: CardSize;
  href?: string;
  /** Open `href` in a new tab. Defaults to true for external (http) links. */
  newTab?: boolean;
  /** Full page load instead of client navigation — links from our pages to users' pages, so our analytics
   *  (components/Analytics.tsx) never carries over onto them */
  reload?: boolean;
  /** Extra Tailwind classes for this one card, e.g. "bg-black! text-white". Use `!` to beat the defaults. */
  className?: string;
  /**
   * Hover effect:
   * "bg" = background turns light gray (default for links), "bg-strong" = slightly darker gray,
   * "dim" = whole card fades to 80% (photos), "none" = no effect (default without a link).
   */
  hover?: CardHover;
};

export type CardHover = "bg" | "bg-strong" | "dim" | "none";

/** A card's grid size as classes (also used by components/CardsToggle.tsx, whose wrapper holds the size) */
export const sizes: Record<CardSize, string> = {
  "1x1": "",
  "2x1": "col-span-2",
  "2x2": "col-span-2 row-span-2",
};

const hovers: Record<CardHover, string> = {
  bg: "transition-[background-color,scale] duration-200 ease-smooth hover:bg-hover",
  "bg-strong": "transition-[background-color,scale] duration-200 ease-smooth hover:bg-hover-strong",
  dim: "transition-[opacity,scale] duration-200 ease-smooth hover:opacity-80",
  none: "",
};

/** Rounded, shadowed tile. Renders a link when `href` is set. Children can react to hover with `group-hover:`. */
export function Card({
  size = "1x1",
  href,
  newTab,
  reload,
  hover,
  className = "",
  layout = "",
  children,
  ...rest
}: BaseCard & {
  /** Internal layout classes set by each card component (user `className` is applied after). */
  layout?: string;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "children" | "className">) {
  // Only complete links become clickable (a half-typed "https://" in the editor stays a plain card).
  const linkable = !!href && /^(https?:\/\/[^\s/]+|mailto:\S+|(tel|sms):\+?\d{3,}$|\/(?!\/))/i.test(href);
  const effect = hovers[hover ?? (linkable ? "bg" : "none")];
  // `card` is the styling hook looks use for every card (looks/README.md → "Hooks"); keep it on the root element.
  const cls = `card group relative block overflow-hidden rounded-card bg-card text-ink shadow-card ${effect} ${linkable ? "active:scale-[0.985]" : ""} ${sizes[size]} ${layout} ${className}`;
  if (!linkable) return <div className={cls} {...rest}>{children}</div>;
  const blank = newTab ?? /^https?:/.test(href);
  if (reload)
    return (
      <a href={href} className={cls} {...(blank && { target: "_blank", rel: "noopener noreferrer" })}>
        {children}
      </a>
    );
  return (
    <Link
      href={href}
      className={cls}
      {...(blank && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </Link>
  );
}

/**
 * 20px icon: a stored icon string ("/icons/x.svg", "lucide:Heart", "mask:/icons/x-card.svg")
 * or any React node (e.g. a lucide icon element).
 * Always wrapped in `span.card-icon` — the hook looks use to put a badge behind a card's icon. The badge goes on
 * the wrapper, so a one-colour mask icon inside (drawn with background-color) is never painted over.
 */
export function CardIcon({ icon, className = "" }: { icon: ReactNode | string; className?: string }) {
  return (
    <span className={`card-icon flex size-5 shrink-0 items-center justify-center text-muted ${className}`}>
      {typeof icon === "string" ? <StoredIcon value={icon} className="size-5" /> : icon}
    </span>
  );
}

/** The ↗ in a card's corner. `card-arrow` is the hook looks use to restyle it (keep it on links, not on buttons). */
export function Arrow({ className = "text-muted" }: { className?: string }) {
  return <ArrowUpRight className={`card-arrow size-5 ${className}`} strokeWidth={1.75} />;
}

/** Top row: icon on the left, arrow / badge / anything on the right. `card-top` is a styling hook for looks. */
export function CardTop({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return (
    <div className="card-top relative z-10 flex items-start justify-between">
      {left ?? <span />}
      {right}
    </div>
  );
}

/** Title + optional subtitle, 14px/20px. */
export function CardText({
  title,
  subtitle,
  className = "",
  light,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`relative z-10 text-sm ${className}`}>
      <p className={light ? "text-white" : undefined}>{title}</p>
      {subtitle && <p className={light ? "text-white/60" : "text-muted"}>{subtitle}</p>}
    </div>
  );
}

/** Small gray text for the top-right corner (follower counts, read time…). */
export function Badge({ children }: { children: ReactNode }) {
  return <span className="flex shrink-0 items-center gap-1 text-sm whitespace-nowrap text-subtle">{children}</span>;
}
