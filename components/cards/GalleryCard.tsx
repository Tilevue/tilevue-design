"use client";

import { useEffect, useRef, useState } from "react";
import { Card, type BaseCard } from "../Card";

export type GalleryCardProps = BaseCard & {
  images: { src: string; alt?: string }[];
  /** Seconds per photo. 0 = only change on dot click. */
  interval?: number;
};

/** Several photos that cross-fade, with dots to jump between them. */
export function GalleryCard({ images, interval = 4, ...card }: GalleryCardProps) {
  const [i, setI] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || !interval || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // hidden or off-screen copies (home page previews) stand still (older browsers without checkVisibility: always advance)
    const id = setInterval(() => {
      if (box.current?.checkVisibility?.({ visibilityProperty: true, contentVisibilityAuto: true }) ?? true) setI((n) => (n + 1) % count);
    }, interval * 1000);
    return () => clearInterval(id);
  }, [count, interval, i]); // restarting on `i` gives a full interval after a dot click

  return (
    <Card {...card} size={card.size ?? "2x2"} hover={card.hover ?? "none"}>
      {/* photos fade to 80% on hover, like the photo cards; dots stay crisp */}
      <div ref={box} className="absolute inset-0 transition-opacity duration-200 ease-smooth group-hover:opacity-80">
        {images.map((img, n) => (
          <img
            key={n}
            src={img.src}
            alt={img.alt ?? ""}
            loading={n === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-smooth ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
          {images.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Photo ${n + 1}`}
              onClick={(e) => {
                e.preventDefault(); // don't follow the card link
                setI(n);
              }}
              className={`h-1.5 cursor-pointer rounded-full bg-white shadow-[0_0_4px_rgb(0_0_0/0.3)] transition-all duration-300 ease-smooth ${n === i ? "w-4" : "w-1.5 opacity-60"}`}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
