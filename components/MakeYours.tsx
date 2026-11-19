"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { TileMark } from "./icons";
import { Button } from "./ui";

const EVENT = "tv:interacted";
const SEEN = "tv_make_yours"; // sessionStorage: shown once per visit

/** Interactive cards call this after a visitor signs / wishes / votes / reacts. */
export const interacted = () => window.dispatchEvent(new Event(EVENT));

/**
 * After a visitor's first interaction: a small sheet slides up — "make your own page". Once per tab session; waits
 * while a popup (dialog) is open. Mounted for visitors only (app/[username]/page.tsx). "Create yours" → /signup with the
 * badge's ref/from, so the tap and any page made after it count in the badge stats (proxy.ts, app/signup/page.tsx).
 */
export function MakeYours({ page }: { page: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let wanted = false;
    const tryShow = () => {
      if (!wanted || document.querySelector("dialog[open]") || sessionStorage.getItem(SEEN)) return;
      sessionStorage.setItem(SEEN, "1");
      setShow(true);
    };
    const onInteract = () => {
      wanted = true;
      tryShow();
    };
    const onClose = () => setTimeout(tryShow, 250); // after the popup's own close
    window.addEventListener(EVENT, onInteract);
    document.addEventListener("close", onClose, true); // dialog "close" doesn't bubble: listen in the capture phase
    return () => {
      window.removeEventListener(EVENT, onInteract);
      document.removeEventListener("close", onClose, true);
    };
  }, []);

  if (!show) return null;
  return (
    <div
      role="dialog"
      aria-label={`Make your own ${site.name} page`}
      className="fixed inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] z-50 mx-auto flex w-[calc(100%-32px)] max-w-[400px] animate-sheet-up items-center gap-3 rounded-[20px] bg-popup p-3 pl-4 text-ink shadow-card"
    >
      <TileMark className="size-6 shrink-0" />
      <p className="min-w-0 flex-1 text-sm leading-5">
        <span className="block font-medium">Like this page?</span>
        <span className="block text-muted">Make yours free</span>
      </p>
      <Button onClick={() => (location.href = `/signup?ref=badge&from=${page}`)}>Create yours</Button>
      <button onClick={() => setShow(false)} aria-label="Close" className="-ml-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-ink">
        <X className="size-4" />
      </button>
    </div>
  );
}
