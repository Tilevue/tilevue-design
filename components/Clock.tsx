"use client";

import { useEffect, useState } from "react";

/** Live time, e.g. "FRI, OCT 02, 03:52 PM". Rendered client-side only to avoid a hydration mismatch. */
export function Clock({ timeZone }: { timeZone?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);

  const text = now?.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
  // `page-clock` is the hook looks use to restyle it (a pill, a label, a top bar…)
  return <p className="page-clock h-3 font-mono text-xs leading-3 font-medium text-subtle uppercase">{text}</p>;
}
