"use client";

import { useEffect, useRef, useState } from "react";

type Christmas = typeof import("@/looks/christmas");

/**
 * The script part of a look (looks/README.md → "Script"). Sits in the header; finds the page wrapper
 * (`[data-look]`), and while its look is "christmas" loads looks/christmas.ts: the snow canvas, and the bells as a
 * button. Follows the editor's look picker (watches data-look). Does nothing in look previews (thumbs, swatches).
 * ponytail: one look has a script, so it's named here; a map of id → import() when a second one does.
 */
export function LookFx() {
  const ref = useRef<HTMLElement>(null);
  const [fx, setFx] = useState<Christmas | null>(null);

  useEffect(() => {
    const main = ref.current?.closest<HTMLElement>("[data-look]");
    if (!main || main.matches(".look-thumb, .look-swatch")) return;
    let stop: (() => void) | undefined;
    let run = 0; // the latest sync wins (a quick look switch while the import loads)
    const sync = () => {
      const mine = ++run;
      stop?.();
      stop = undefined;
      setFx(null);
      if (main.dataset.look !== "christmas") return;
      import("@/looks/christmas").then((m) => {
        if (mine !== run) return;
        stop = m.start(main);
        setFx(m);
      });
    };
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(main, { attributes: true, attributeFilter: ["data-look"] });
    return () => {
      run++;
      watch.disconnect();
      stop?.();
    };
  }, []);

  return (
    <>
      <i ref={ref} hidden />
      {fx && (
        <button
          type="button"
          aria-label="Ring the bells"
          className="xmas-bells"
          // our own drawing (looks/christmas.ts BELLS), not user content
          dangerouslySetInnerHTML={{ __html: fx.BELLS }}
          onClick={(e) => fx.ring(e.currentTarget)}
        />
      )}
    </>
  );
}
