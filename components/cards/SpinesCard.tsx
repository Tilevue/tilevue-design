"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardTop, type BaseCard } from "../Card";

type Book = { title: string; author?: string; cover?: string; pages?: number; color?: string; href?: string };

export type SpinesCardProps = BaseCard & {
  title?: string;
  books: Book[];
};

// book-cloth spine colours for books without a cover (content, not theme)
const PALETTE = ["#24364f", "#a2482a", "#e4ddd0", "#4d5e35", "#6e2a2a", "#d2a23c", "#3b4552", "#8a9a7b", "#4a3446"];
// no page count: thick and thin books anyway (px), so the row doesn't look like a barcode
const WIDTH = [26, 32, 22, 30, 24, 34, 23, 28, 26];
/**
 * Spine width in px from the page count, like a real book (much thinner than tall): 100 pages ≈ 21px,
 * 300 ≈ 35px, 500+ capped at 48px. Books keep this width and the shelf keeps its empty space — no stretching.
 */
const spineWidth = (b: Book, i: number) => (b.pages ? Math.round(Math.min(48, Math.max(18, 14 + b.pages / 14))) : WIDTH[i % WIDTH.length]);
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150;
};
// round spine: shadow at both edges, soft highlight just left of centre
const SHADE =
  "linear-gradient(90deg, rgb(0 0 0/0.32), rgb(255 255 255/0.18) 22%, rgb(255 255 255/0) 50%, rgb(0 0 0/0.1) 80%, rgb(0 0 0/0.36))";
// over a cover: darken it a little so the printed title stays readable
const INK = "linear-gradient(rgb(0 0 0/0.3), rgb(0 0 0/0.3))";

/** Foil bands printed across the spine, in the title's colour */
const Bands = () => (
  <span className="flex w-full flex-col gap-[2px] px-[18%] opacity-50">
    <span className="h-px bg-current" />
    <span className="h-px bg-current" />
  </span>
);

/**
 * A shelf of books. A book's cover becomes its spine (a strip of the cover art); hover, focus or tap pulls it out and
 * shows its title, author and a link in the top row. Taps on a book don't open the card's list sheet (it's a button).
 */
export function SpinesCard({ title = "On my shelf", books, ...card }: SpinesCardProps) {
  const shown = books.slice(0, 9);
  const [active, setActive] = useState<number | null>(null);
  const book = active === null ? null : shown[active];
  const store = book?.href && /amazon\./i.test(book.href);

  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col p-4">
      <CardTop
        left={
          book ? (
            <span className="min-w-0 pr-2 text-sm">
              <span className="block truncate font-medium">{book.title}</span>
              {book.author && <span className="block truncate text-muted">{book.author}</span>}
            </span>
          ) : (
            <span className="text-sm">{title}</span>
          )
        }
        right={
          book?.href ? (
            <a
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-ink px-3 text-xs font-medium text-page transition-[opacity,scale] duration-200 ease-smooth hover:opacity-85 active:scale-[0.97]"
            >
              {store ? "Buy" : "Open"} <ArrowUpRight className="size-3.5" />
            </a>
          ) : (
            !book && <span className="text-sm text-subtle">{shown.length} books</span>
          )
        }
      />
      <div className="mt-auto flex h-[70%] flex-col" onMouseLeave={() => setActive(null)}>
        <div className="flex min-h-0 flex-1 items-end gap-[3px] px-2">
          {shown.map((b, i) => {
            const on = active === i;
            const bg = b.color && /^#[0-9a-f]{6}$/i.test(b.color) ? b.color : PALETTE[i % PALETTE.length];
            return (
              <button
                key={i}
                type="button"
                aria-label={b.author ? `${b.title} by ${b.author}` : b.title}
                aria-pressed={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`@container relative flex min-w-0 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-t-[3px] rounded-b-[1px] py-1.5 transition-[translate,box-shadow,opacity] duration-300 ease-spring ${
                  on ? "-translate-y-3 shadow-[0_12px_18px_-6px_rgb(0_0_0/0.5)]" : "shadow-[1px_0_2px_rgb(0_0_0/0.2)]"
                } ${active !== null && !on ? "opacity-50" : ""}`}
                style={{
                  backgroundColor: bg,
                  backgroundImage: b.cover ? undefined : SHADE,
                  color: b.cover || !isLight(bg) ? "rgb(255 255 255/0.92)" : "rgb(0 0 0/0.72)",
                  // real books differ in height too
                  height: `${76 + ((i * 37) % 23)}%`,
                  // natural thickness; shrinks only when 9 thick books wouldn't fit
                  width: spineWidth(b, i),
                }}
              >
                {b.cover && (
                  <>
                    {/* the cover, blurred into the spine's colour and texture (its printed text would look fake sideways) */}
                    <span
                      aria-hidden
                      className="absolute inset-0 scale-[1.8] bg-cover bg-center blur-[6px] saturate-[1.3]"
                      style={{ backgroundImage: `url("${b.cover}")` }}
                    />
                    <span aria-hidden className="absolute inset-0" style={{ backgroundImage: `${SHADE}, ${INK}` }} />
                  </>
                )}
                <span className="relative w-full">
                  <Bands />
                </span>
                {/* title like a real spine: one line (…) on thin books, 2 lines from 32px, 3 from 44px */}
                <span className="relative max-h-full min-h-0 overflow-hidden px-0.5 text-center text-[9px] leading-[1.15] font-semibold tracking-[0.04em] text-ellipsis whitespace-nowrap uppercase [text-shadow:0_1px_2px_rgb(0_0_0/0.45)] [writing-mode:vertical-rl] rotate-180 @min-[32px]:max-w-[2.4em] @min-[32px]:whitespace-normal @min-[44px]:max-w-[3.6em]">
                  {b.title}
                </span>
                <span className="relative w-full">
                  <Bands />
                </span>
              </button>
            );
          })}
        </div>
        {/* the shelf: a plank in the theme's ink, with a soft shadow under it */}
        <div className="h-1.5 rounded-[2px] bg-ink/15 shadow-[0_4px_6px_-3px_rgb(0_0_0/0.3)]" />
      </div>
    </Card>
  );
}
