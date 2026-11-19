"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Card, CardText, type BaseCard } from "../Card";

export type MapCardProps = Omit<BaseCard, "href"> & {
  /** Full address — shown on the card and used for the Google Maps link */
  address: string;
  /** e.g. "Find us" */
  title: string;
  /** [lat, lng] from the editor's place search; without it the card shows a drawn map */
  coords?: [number, number];
  zoom?: number;
  /** Google Business Profile link — a tap opens it instead of plain directions */
  business?: string;
};

// OpenStreetMap data as vector tiles from OpenFreeMap: free, no key, no request limits.
const STYLE = (dark: boolean) => `https://tiles.openfreemap.org/styles/${dark ? "dark" : "liberty"}`;

/** A real map of the place (static, a little zoomed out) with a pin; tap → Google Maps or the business profile. */
export function MapCard({ address, title, coords, zoom = 14, business, ...card }: MapCardProps) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [lat, lng] = coords ?? [];
  const href = business || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || `${lat},${lng}`)}`;

  useEffect(() => {
    if (lat === undefined || lng === undefined || !box.current) return;
    const el = box.current;
    let map: import("maplibre-gl").Map | undefined;
    let gone = false;
    setReady(false);
    // the map library (and its tiles) only load once the card is near the screen
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const { Map } = await import("maplibre-gl");
        if (gone) return;
        const theme = document.documentElement.dataset.theme;
        const dark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        map = new Map({ container: el, style: STYLE(dark), center: [lng, lat], zoom, interactive: false, attributionControl: false, fadeDuration: 0 });
        map.setPadding({ top: 0, left: 0, right: 0, bottom: el.clientHeight * 0.3 }); // pin sits above the text
        map.once("idle", () => setReady(true));
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      gone = true;
      io.disconnect();
      map?.remove();
    };
  }, [lat, lng, zoom]);

  return (
    <Card {...card} href={href} layout="flex flex-col justify-between p-4">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* drawn map: shown while the real one loads, and for cards saved before place search */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-ink)_1px,transparent_1.2px)] [background-size:10px_10px] opacity-[0.12]" />
        <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="absolute inset-0 size-full stroke-ink/10" fill="none" strokeLinecap="round">
          <path d="M-10 70 C 60 60, 120 95, 210 80" strokeWidth="9" />
          <path d="M70 -10 C 80 60, 60 130, 95 210" strokeWidth="7" />
          <path d="M-10 150 C 70 140, 140 160, 210 135" strokeWidth="5" />
          <path d="M150 -10 L 135 210" strokeWidth="4" />
        </svg>
        {coords && <div ref={box} className={`absolute inset-0 transition-opacity duration-500 ease-smooth ${ready ? "opacity-100" : "opacity-0"}`} />}
        <div className="absolute inset-0 bg-gradient-to-t from-card from-15% to-transparent to-55%" />
      </div>
      <div className="relative z-10 flex items-start justify-between gap-2">
        {coords ? <span className="min-w-0 truncate rounded-full bg-card/80 px-1.5 py-0.5 text-[9px] leading-none text-muted backdrop-blur">© OpenStreetMap</span> : <span />}
        <span className="shrink-0 rounded-full bg-card px-2.5 py-1 text-xs font-medium whitespace-nowrap shadow-card">{business ? "Reviews" : "Directions"}</span>
      </div>
      {/* pin: its tip marks the place; hops on hover */}
      <span
        className={`absolute left-1/2 z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center transition-transform duration-300 ease-spring group-hover:-translate-y-[calc(100%+4px)] ${coords ? "top-[35%]" : "top-[44%]"}`}
      >
        <span className="relative flex size-5 items-center justify-center rounded-full bg-red-500 shadow-[0_2px_6px_rgb(239_68_68/0.5)] ring-4 ring-red-500/20">
          <span className="size-1.5 rounded-full bg-white" />
        </span>
        <span className="mt-0.5 h-1 w-3 rounded-full bg-black/20 blur-[1px]" />
      </span>
      <CardText title={title} subtitle={address} className="[&_p:last-child]:line-clamp-2" />
    </Card>
  );
}
