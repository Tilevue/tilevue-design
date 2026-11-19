"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { CARD_EXPAND, CARD_TYPES, type CardExpand, type CardType, type Field } from "@/lib/cardSchema";
import { itemAction } from "./cards/ItemCard";
import { Popup } from "./Popup";

/**
 * Tap a card on the public page → a bigger view (which cards and how: CARD_EXPAND in lib/cardSchema.ts).
 * The body is read from the card type's `fields`, so every listed card works without code of its own.
 */

type Values = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");
const isVideo = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);
const linkable = (h: string) => /^(https?:\/\/[^\s/]+|mailto:\S+|(tel|sms):\+?\d{3,}$|\/(?!\/))/i.test(h);
const IMAGE: Field["kind"][] = ["image", "media"];
// card settings rather than content: never shown in the sheet
const SKIP_KEYS = new Set(["href", "alt", "position", "tags", "phone", "message", "code", "cta", "icon", "avatar", "timeZone", "interval"]);
const SKIP_KINDS: Field["kind"][] = ["icon", "url", "color", "coords", "levels", "checkbox", "number", "select"];

function when(v: string) {
  const d = new Date(v.length === 10 ? v + "T12:00:00" : v);
  if (isNaN(+d)) return v;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", ...(v.length > 10 && { hour: "2-digit", minute: "2-digit" }) });
}

/** Every photo on the card: top-level image fields, then photos inside list items. */
function photosOf(fields: Field[], v: Values): { src: string; caption: string }[] {
  const out: { src: string; caption: string }[] = [];
  for (const f of fields) {
    if (IMAGE.includes(f.kind) && str(v[f.key]) && !SKIP_KEYS.has(f.key)) out.push({ src: str(v[f.key]), caption: str(v.alt) });
    if (f.kind === "items" && Array.isArray(v[f.key])) {
      const img = f.fields?.find((s) => IMAGE.includes(s.kind));
      const cap = f.fields?.find((s) => s.kind === "text");
      if (img) for (const it of v[f.key] as Values[]) str(it[img.key]) && out.push({ src: str(it[img.key]), caption: cap ? str(it[cap.key]) : "" });
    }
  }
  return out;
}

function Photos({ photos, big }: { photos: { src: string; caption: string }[]; big?: boolean }) {
  const [at, setAt] = useState(0);
  if (!photos.length) return null;
  return (
    <div className="space-y-2">
      <div
        onScroll={(e) => setAt(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl bg-fill [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p, i) => (
          <figure key={i} className="flex w-full shrink-0 snap-center flex-col items-center justify-center">
            {isVideo(p.src) ? (
              <video src={p.src} controls playsInline className={`w-full object-contain ${big ? "max-h-[70dvh]" : "max-h-[50dvh]"}`} />
            ) : (
              <img src={p.src} alt={p.caption} className={`w-full object-contain ${big ? "max-h-[70dvh]" : "max-h-[50dvh]"}`} />
            )}
          </figure>
        ))}
      </div>
      {(photos.length > 1 || photos[at]?.caption) && (
        <div className="flex items-center justify-between gap-3 px-1 text-sm">
          <span className="text-muted">{photos[at]?.caption}</span>
          {photos.length > 1 && (
            <span className="shrink-0 text-xs text-subtle tabular-nums">
              {at + 1} / {photos.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** One entry of a list field: its photo (small), first value bold, the rest muted; a row link when it has one. */
function Row({ fields, item }: { fields: Field[]; item: Values }) {
  const img = fields.find((s) => IMAGE.includes(s.kind));
  const urlField = fields.find((s) => s.kind === "url");
  const href = urlField ? str(item[urlField.key]) : "";
  const time = str(item.time);
  const parts = fields.filter((s) => s.key !== "time")
    .map((s) => {
      const x = item[s.key];
      if (s.kind === "checkbox") return x ? s.label : "";
      if (s.kind === "datetime") return str(x) && when(str(x));
      if (s.kind === "number") return str(x) && (s.max === 100 ? `${str(x)}%` : str(x));
      if (s.kind === "list") return Array.isArray(x) ? x.join(", ") : "";
      return ["text", "textarea", "select", "email"].includes(s.kind) ? str(x) : "";
    })
    .filter(Boolean);
  if (!parts.length && !img && !time) return null;
  const body = (
    <>
      {img && str(item[img.key]) && <img src={str(item[img.key])} alt="" className="size-10 shrink-0 rounded-xl object-cover" />}
      {time && <span className="w-14 shrink-0 font-mono text-xs text-muted tabular-nums">{time}</span>}
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{parts[0]}</span>
        {parts.length > 1 && <span className="block text-muted">{parts.slice(1).join(" · ")}</span>}
      </span>
      {href && linkable(href) && <ArrowUpRight className="size-4 shrink-0 text-muted" />}
    </>
  );
  const cls = "flex items-center gap-3 px-2 py-2.5 text-sm";
  return href && linkable(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} rounded-xl transition-colors hover:bg-fill`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function Body({ type, values, mode }: { type: CardType; values: Values; mode: CardExpand }) {
  const fields = CARD_TYPES[type].fields as Field[];
  const photos = photosOf(fields, values);
  if (mode === "photos") return <Photos photos={photos} big />;

  const title = str(values.title) || str(values.name);
  // title, name and price sit in the header row
  const show = fields.filter((f) => !f.more && !f.hidden && !SKIP_KEYS.has(f.key) && !["title", "name", "price", "badge", "rsvpLabel"].includes(f.key));
  const sold = values.status === "sold";
  const status = str(values.badge) || fields.find((f) => f.key === "status")?.options?.find((o) => o.value === values.status && o.value !== "available")?.label;

  let action: { href: string; label: string; wa?: boolean } | null = null;
  if (type === "item") {
    const a = itemAction(values as { title: string; phone?: string; href?: string; message?: string });
    if (a.link && !sold) action = { href: a.link, label: str(values.cta) || (a.wa ? "Ask on WhatsApp" : "View"), wa: a.wa };
  } else if (str(values.href) && linkable(str(values.href))) {
    const label = str(values.rsvpLabel) || str(values.cta) || (type === "listing" ? "View listing" : "Open link");
    action = { href: str(values.href), label };
  }

  const blocks: ReactNode[] = [];
  for (const f of show) {
    const v = values[f.key];
    if (IMAGE.includes(f.kind) || SKIP_KINDS.includes(f.kind)) continue;
    if (f.kind === "items" && Array.isArray(v) && f.fields && !f.fields.every((s) => IMAGE.includes(s.kind))) {
      blocks.push(
        <div key={f.key} className="-mx-2 divide-y divide-ring">
          {(v as Values[]).map((it, i) => (
            <Row key={i} fields={f.fields!} item={it} />
          ))}
        </div>,
      );
    } else if (f.kind === "list" && Array.isArray(v) && v.length) {
      blocks.push(
        <ul key={f.key} className="flex flex-wrap gap-1.5">
          {(v as string[]).map((x, i) => (
            <li key={i} className="rounded-full bg-fill px-3 py-1 text-sm">
              {x}
            </li>
          ))}
        </ul>,
      );
    } else if (f.kind === "datetime" && str(v)) {
      blocks.push(<p key={f.key} className="text-sm text-muted">{when(str(v))}</p>);
    } else if (f.kind === "textarea" && str(v)) {
      blocks.push(<p key={f.key} className="text-base leading-relaxed whitespace-pre-line">{str(v)}</p>);
    } else if (str(v)) {
      const gmap = str(values.mapLink) || ((f.key === "location" || f.key === "place") ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(str(v))}` : "");
      if (gmap && (f.key === "location" || f.key === "place")) {
        blocks.push(
          <p key={f.key} className="text-sm text-muted">
            <a href={gmap} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-ink hover:underline">
              <MapPin className="size-3.5 shrink-0" /> {str(v)}
            </a>
          </p>,
        );
      } else {
        blocks.push(<p key={f.key} className="text-sm text-muted">{str(v)}</p>);
      }
    }
  }

  return (
    <div className="space-y-4 p-2">
      <Photos photos={photos} />
      {(title || values.price || status) && (
        <div className="flex items-start justify-between gap-3">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <div className="flex shrink-0 flex-col items-end gap-1">
            {str(values.price) && <span className={`text-lg font-semibold tabular-nums ${sold ? "text-muted line-through" : ""}`}>{str(values.price)}</span>}
            {status && <span className="rounded-full bg-fill px-2.5 py-0.5 text-xs font-medium">{status}</span>}
          </div>
        </div>
      )}
      {blocks}
      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-[opacity,scale] duration-200 ease-smooth hover:opacity-90 active:scale-[0.98] ${action.wa ? "bg-emerald-500 text-white" : "bg-ink text-page"}`}
        >
          {action.wa ? <MessageCircle className="size-4" /> : <ArrowUpRight className="size-4" />}
          {action.label}
        </a>
      )}
    </div>
  );
}

/** Is any text inside the card cut off (line-clamp / overflow)? */
const cutOff = (root: Element | null) =>
  !!root && [root, ...root.querySelectorAll("*")].some((el) => el.scrollHeight - el.clientHeight > 2 && getComputedStyle(el).overflowY !== "visible");

/**
 * Wraps one card on the public page (no box of its own). A tap on the card itself opens the sheet; taps on the
 * card's own buttons/links (WhatsApp, photo dots…) keep working. A card that is a link keeps its link — except
 * "details" cards, whose sheet shows that link as its button.
 */
export function Expandable({ type, values, id, children }: { type: CardType; values: Values; id?: string; children: ReactNode }) {
  const mode = CARD_EXPAND[type]!;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const opens = (target: Element) => {
    const root = ref.current?.firstElementChild ?? null;
    if (target.closest("dialog")) return false;
    const hit = target.closest("a, button, input, select, textarea, label, summary, iframe, [role=button]");
    if (hit && hit !== root && ref.current?.contains(hit)) return false; // the card's own control
    if (hit === root && root?.matches("a, button") && mode !== "details") return false; // the owner made the card a link
    if (mode === "more" && !cutOff(root)) return false; // nothing hidden
    return true;
  };

  // keyboard: a card that opens a sheet is focusable and opens on Enter / Space
  useEffect(() => {
    const root = ref.current?.firstElementChild as HTMLElement | null;
    if (!root || root.matches("a, button") || (mode === "more" && !cutOff(root))) return;
    root.tabIndex = 0;
    root.setAttribute("role", "button");
    root.setAttribute("aria-haspopup", "dialog");
    root.classList.add("cursor-pointer");
  }, [mode]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!opens(e.target as Element)) return;
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && e.target === ref.current?.firstElementChild && opens(e.target as Element)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  // the body has the card's own title as a heading; the bar names the kind of card (photos: the title, no heading)
  const title = mode === "photos" ? str(values.title) || CARD_TYPES[type].label : CARD_TYPES[type].label;
  return (
    <div ref={ref} data-card={id} className="contents" onClickCapture={onClick} onKeyDown={onKey}>
      {children}
      <Popup open={open} onClose={() => setOpen(false)} title={title} wide={mode === "photos"} full>
        {open && <Body type={type} values={values} mode={mode} />}
      </Popup>
    </div>
  );
}
