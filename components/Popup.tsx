"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { Arrow } from "./Card";
import { MaskIcon } from "./MaskIcon";

/**
 * Modal shell: "Title · count" header, close button, and a card-coloured panel for the content.
 * Closes on Escape, backdrop click and the X button.
 *
 *   const [open, setOpen] = useState(false);
 *   <button onClick={() => setOpen(true)}>Open</button>
 *   <Popup open={open} onClose={() => setOpen(false)} title="Stack" count={6}>
 *     <PopupList items={items} />
 *   </Popup>
 */
export function Popup({
  open,
  onClose,
  title,
  count,
  wide,
  full,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  count?: number;
  /** 880px instead of 480px (videos) */
  wide?: boolean;
  /** Phone: whole screen instead of a bottom sheet (sm+ unchanged) */
  full?: boolean;
  /** Action buttons pinned under the scrolling content (always visible) */
  footer?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Full screen: follow the visible area, so the on-screen keyboard doesn't cover the bottom (iOS + Android)
  useEffect(() => {
    const vv = window.visualViewport;
    if (!full || !open || !vv) return;
    const d = ref.current!;
    const fit = () => {
      d.style.setProperty("--vvh", `${vv.height}px`);
      d.style.setProperty("--vvt", `${vv.offsetTop}px`);
    };
    fit();
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    return () => {
      vv.removeEventListener("resize", fit);
      vv.removeEventListener("scroll", fit);
    };
  }, [full, open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      // Phone: bottom sheet (full width, slides up, clears the iPhone home bar). sm+: centered modal.
      className={`m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] ${wide ? "max-w-[880px]" : "max-w-[480px]"} flex-col overscroll-contain rounded-[20px] bg-popup p-1 text-ink shadow-card open:flex open:animate-fade-up max-sm:mb-0 max-sm:w-full max-sm:max-w-none max-sm:pb-[max(4px,env(safe-area-inset-bottom))] max-sm:open:animate-sheet-up ${full ? "max-sm:mt-[var(--vvt,0px)] max-sm:h-[var(--vvh,100dvh)] max-sm:max-h-none max-sm:rounded-none max-sm:pt-[env(safe-area-inset-top)]" : "max-sm:max-h-[92dvh] max-sm:rounded-b-none"}`}
    >
      {!full && <span aria-hidden className="mx-auto mt-1.5 h-1 w-9 shrink-0 rounded-full bg-ink/15 sm:hidden" />}
      <div className="flex items-center justify-between py-1 pr-1 pl-3 text-sm">
        <p className="font-medium">
          {title} {count !== undefined && <span className="font-normal text-muted">· {count}</span>}
        </p>
        <button onClick={onClose} aria-label="Close" className="flex size-10 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-ink">
          <X className="size-4" />
        </button>
      </div>
      <div className={`no-scrollbar min-h-0 overflow-y-auto overscroll-contain rounded-2xl bg-card p-2 shadow-card ${full ? "max-sm:flex-1" : ""}`}>{children}</div>
      {footer && <div className="flex shrink-0 items-center justify-between gap-2 px-2 pt-2 pb-2">{footer}</div>}
    </dialog>
  );
}

export type PopupItem = {
  name: string;
  /** Small gray line above the name (brand, category…) */
  brand?: string;
  /** Product photo or logo path */
  image: string;
  /** Black single-colour logo: tint it so it stays visible in dark mode */
  mono?: boolean;
  href?: string;
};

/** Rows of image + brand + name + arrow. Items with `href` open in a new tab. */
export function PopupList({ items }: { items: PopupItem[] }) {
  return (
    <ul>
      {items.map((item) => {
        const row = (
          <>
            <span className="flex size-12 shrink-0 items-center justify-center">
              {item.mono ? (
                <MaskIcon src={item.image} className="size-8" />
              ) : (
                <img
                  src={item.image}
                  alt=""
                  className={item.image.endsWith(".svg") ? "size-8" : "max-h-12 max-w-12 object-contain"}
                />
              )}
            </span>
            <span className="flex-1 text-sm leading-6">
              {item.brand && <span className="block text-muted">{item.brand}</span>}
              <span className="block font-medium">{item.name}</span>
            </span>
            {item.href && <Arrow />}
          </>
        );
        const cls = "flex items-center gap-4 rounded-xl p-2 transition-colors duration-200 ease-smooth";
        return (
          <li key={item.name}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-fill`}>
                {row}
              </a>
            ) : (
              <div className={cls}>{row}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
