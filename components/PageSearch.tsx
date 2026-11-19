"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Search, X } from "lucide-react";
import { Button, inputClass } from "./ui";

export type SearchItem = { node: ReactNode; text: string };

const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();

/**
 * Small search icon above a page's cards. Tap → a text box; cards filter as you type (every word must match,
 * accents ignored; tags are part of the text). Keeps ?q= in the URL, so a creator can link straight to "?q=lamp".
 */
export function PageSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const anchor = useRef<HTMLDivElement>(null);

  const index = useMemo(() => items.map((it, i) => ({ ...it, i, folded: fold(it.text) })), [items]);
  const words = fold(q).split(/\s+/).filter(Boolean);
  const active = words.length > 0;
  const shown = active ? index.filter((it) => words.every((w) => it.folded.includes(w))) : index;

  // ?q= on load (old ?tag= links too), then keep the URL in step (replace, so Back still leaves the page)
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const start = p.get("q") ?? p.get("tag") ?? "";
    setQ(start);
    setOpen(!!start);
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    const u = new URL(location.href);
    u.searchParams.delete("tag");
    q.trim() ? u.searchParams.set("q", q.trim()) : u.searchParams.delete("q");
    history.replaceState(history.state, "", u);
    // results start right under the box, not somewhere further down the old page
    const top = anchor.current?.getBoundingClientRect().top ?? 0;
    if (active && top < 0) scrollBy({ top });
  }, [q, loaded, active]);

  // "/" opens the search (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== "/" || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      e.preventDefault();
      setOpen(true);
      input.current?.focus();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const close = () => (setQ(""), setOpen(false));

  return (
    <>
      <div ref={anchor} />
      <div className={open ? "sticky top-0 z-30 mb-4 bg-page/85 pt-[max(12px,env(safe-area-inset-top))] pb-3 backdrop-blur" : "mb-4"}>
        <div className="mx-auto flex w-[min(100vw-32px,848px)] justify-end">
          {open ? (
            <form role="search" onSubmit={(e) => (e.preventDefault(), input.current?.blur())} className="relative w-full animate-fade-up">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" strokeWidth={2} />
              <input
                ref={input}
                autoFocus
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                aria-label="Search this page"
                placeholder="Search this page"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && close()}
                className={`${inputClass.replace("bg-fill", "bg-card")} rounded-full pr-11 pl-10 shadow-card [&::-webkit-search-cancel-button]:hidden`}
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={close}
                className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-fill hover:text-ink"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </form>
          ) : (
            <button
              type="button"
              aria-label="Search this page"
              onClick={() => setOpen(true)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-card text-muted shadow-card transition-[background-color,scale,color] duration-200 ease-smooth hover:bg-hover hover:text-ink active:scale-[0.94]"
            >
              <Search className="size-4" strokeWidth={2} />
            </button>
          )}
        </div>
        <p aria-live="polite" className={active && shown.length ? "mx-auto mt-2 w-[min(100vw-32px,848px)] px-1 text-xs text-muted" : "sr-only"}>
          {active ? `${shown.length} ${shown.length === 1 ? "result" : "results"}` : ""}
        </p>
      </div>

      {shown.length ? (
        <section className="bento">
          {shown.map((it) => (
            <Fragment key={it.i}>{it.node}</Fragment>
          ))}
        </section>
      ) : (
        <div className="mx-auto w-[min(100vw-32px,848px)] rounded-card bg-card px-6 py-12 text-center shadow-card">
          <p className="text-sm text-ink">Nothing matches “{q.trim()}”.</p>
          <p className="mt-1 text-sm text-muted">Try another word, or see everything.</p>
          <Button variant="secondary" className="mt-4" onClick={() => (setQ(""), input.current?.focus())}>
            Clear search
          </Button>
        </div>
      )}
    </>
  );
}
