"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

type RGB = [number, number, number];

export type GlobeOptions = {
  /** Sphere colour, 0–1 per channel. Defaults adapt to light/dark theme. */
  baseColor?: RGB;
  /** Outer glow colour. */
  glowColor?: RGB;
  /** Land dot darkness in light mode (~1–3). */
  mapBrightness?: number;
  /** Number of dots. */
  mapSamples?: number;
  /** 0 = light globe, 1 = dark globe. */
  dark?: number;
  /** Radians per frame. 0 = static. */
  speed?: number;
  /** Red pins, [latitude, longitude] each */
  markers?: [number, number][];
};

/** Dotted WebGL globe (cobe) facing `coords`. Rotation stops when the visitor prefers reduced motion. */
export function Globe({
  coords,
  className = "",
  speed = 0.002,
  mapSamples = 30000,
  markers = [],
  ...colors
}: GlobeOptions & { coords: [number, number]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = JSON.stringify({ coords, speed, mapSamples, markers, colors });

  useEffect(() => {
    // Pick light/dark defaults from the page theme (site.colorScheme or the OS setting).
    const theme = document.documentElement.dataset.theme;
    const isDark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const {
      baseColor = isDark ? [0.35, 0.35, 0.35] : [1, 1, 1],
      glowColor = isDark ? [0.09, 0.09, 0.09] : [1, 1, 1],
      mapBrightness = isDark ? 4 : 1.5,
      dark = isDark ? 1 : 0,
    } = colors;

    const canvas = ref.current!;
    const size = canvas.offsetWidth;
    const [lat, lon] = coords;
    let phi = Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2);
    const step = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : speed;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(devicePixelRatio, 2), // the shader costs per pixel: no 2× on a 1× screen
      width: size,
      height: size,
      phi,
      theta: (lat * Math.PI) / 180 - 0.3,
      dark,
      diffuse: 2,
      mapSamples,
      mapBrightness,
      mapBaseBrightness: 0,
      baseColor,
      markerColor: [0.94, 0.27, 0.27],
      glowColor,
      markers: markers.map((location) => ({ location, size: 0.045 })),
    });

    // cobe v2 only draws on update(); the land texture loads async, so keep redrawing.
    // ...but only while it's on screen: off screen (or in a hidden preview) the loop stops
    let frame = 0;
    // ponytail: every 3rd frame (~20fps) — the spin is slow enough not to show it, and each draw is costly on weak
    // GPUs; draw every frame if it ever spins fast
    let n = 0;
    const tick = () => {
      if (n++ % 3 === 0) {
        phi += step * 3;
        globe.update({ phi });
      }
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(frame);
      if (e.isIntersecting) frame = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, [key]); // re-create only when an option's value changes

  return <canvas ref={ref} className={`pointer-events-none aspect-square ${className}`} />;
}
