"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { MaskIcon } from "../MaskIcon";
import { Card, CardText, type BaseCard } from "../Card";

export type ItemCardProps = Omit<BaseCard, "href"> & {
  photos?: { src: string }[];
  title: string;
  price?: string;
  /** Short facts, shown as "2019 · 84,000 km · Diesel" */
  details?: string[];
  status?: "available" | "reserved" | "sold";
  /** Set → the button opens WhatsApp with `message` already typed */
  phone?: string;
  /** Buy / product link, used when there's no phone */
  href?: string;
  message?: string;
  /** Searchable words on the page (components/PageSearch.tsx) */
  tags?: string[];
  /** Short code a creator can say in a reel: "search LAMP" */
  code?: string;
  /** Button text */
  cta?: string;
};

const digits = (p = "") => p.replace(/\D/g, "");

/** The item's button: WhatsApp with the message typed (when there's a phone), else its buy link. Also used by CardSheet. */
export function itemAction({ phone, href, message, title }: Pick<ItemCardProps, "phone" | "href" | "message" | "title">) {
  const wa = digits(phone).length >= 6 && `https://wa.me/${digits(phone)}?text=${encodeURIComponent(message || `Hi! Is the ${title} still available?`)}`;
  return { wa: !!wa, link: wa || (href && /^https?:\/\/[^\s/]+\.[^\s]+$/i.test(href) ? href : "") };
}

/** Something for sale or recommended: swipeable photos, price, status and one button (WhatsApp or a link). */
export function ItemCard({ photos = [], title, price, details = [], status = "available", phone, href, message, code, cta, ...card }: ItemCardProps) {
  const strip = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const sold = status === "sold";
  const shots = photos.filter((p) => p.src);
  const dark = shots.length > 0; // white text over a photo, theme text without one

  const { wa, link } = itemAction({ phone, href, message, title });
  const small = (card.size ?? "1x1") === "1x1";
  const subtitle = [code && `#${code.replace(/^#/, "")}`, ...details].filter(Boolean).join(" · ");

  const go = (n: number) => strip.current?.scrollTo({ left: n * strip.current.clientWidth, behavior: "smooth" });

  return (
    <Card {...card} hover="none" layout="flex flex-col justify-between p-4">
      {dark ? (
        <div
          ref={strip}
          onScroll={(e) => setAt(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className={`absolute inset-0 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${sold ? "opacity-60 grayscale" : ""}`}
        >
          {shots.map((p, n) => (
            <img key={n} src={p.src} alt={n ? "" : title} loading={n ? "lazy" : "eager"} draggable={false} className="size-full shrink-0 snap-center object-cover" />
          ))}
        </div>
      ) : (
        <ImageIcon className="absolute top-1/2 left-1/2 size-8 -translate-1/2 text-subtle" strokeWidth={1.5} />
      )}
      {dark && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 from-0% via-transparent via-35% to-black/75" />}

      <div className="pointer-events-none relative z-10 flex items-start justify-between gap-2">
        {status !== "available" ? (
          <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            <span className={`size-1.5 rounded-full ${sold ? "bg-white/70" : "bg-amber-400"}`} />
            {sold ? "Sold" : "Reserved"}
          </span>
        ) : (
          <span />
        )}
        {price && (
          <span className={`rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white tabular-nums backdrop-blur ${sold ? "line-through" : ""}`}>
            {price}
          </span>
        )}
      </div>

      <div className="pointer-events-none relative z-10 flex items-end justify-between gap-3">
        <CardText title={<span className="line-clamp-2 font-medium">{title}</span>} subtitle={subtitle && <span className="line-clamp-1">{subtitle}</span>} light={dark} className="min-w-0" />
        {link && !sold && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={small ? cta || (wa ? "Ask on WhatsApp" : "View") : undefined}
            className={`pointer-events-auto inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full text-sm font-medium shadow-card transition-[scale,opacity] duration-200 ease-smooth hover:opacity-90 active:scale-[0.96] ${small ? "w-9" : "px-3.5"} ${wa ? "bg-whatsapp text-white" : "bg-white text-black"}`}
          >
            {wa ? <MaskIcon src="/icons/whatsapp.svg" className="size-4" /> : <ArrowUpRight className="size-4" strokeWidth={2} />}
            {!small && (cta || (wa ? "WhatsApp" : "View"))}
          </a>
        )}
      </div>

      {shots.length > 1 && (
        <div className="absolute inset-x-0 top-[25px] z-10 flex justify-center gap-1.5">
          {shots.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Photo ${n + 1}`}
              onClick={() => go(n)}
              className={`h-1.5 cursor-pointer rounded-full bg-white shadow-[0_0_4px_rgb(0_0_0/0.3)] transition-all duration-300 ease-smooth ${n === at ? "w-4" : "w-1.5 opacity-60"}`}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
