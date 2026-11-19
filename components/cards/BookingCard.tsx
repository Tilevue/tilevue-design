"use client";

import { useEffect, useState } from "react";
import { calSlots } from "@/lib/cal";
import { SlotsCard, type SlotsCardProps } from "./SlotsCard";

export type BookingCardProps = Omit<SlotsCardProps, "slots">;

/** One request per link per page load: the home page shows the same demo card in many previews. */
const asked = new Map<string, Promise<string[]>>();

/** Cal.com booking link: title + length, plus the next free times fetched live in the visitor's time zone. */
export function BookingCard({ icon = "/icons/cal.svg", ...props }: BookingCardProps) {
  const [slots, setSlots] = useState<string[]>([]);
  useEffect(() => {
    let live = true;
    const href = props.href ?? "";
    if (!asked.has(href)) asked.set(href, calSlots(href).catch(() => [])); // no answer → just title + length
    asked.get(href)!.then((s) => live && setSlots(s));
    return () => {
      live = false;
    };
  }, [props.href]);
  return <SlotsCard {...props} icon={icon} slots={slots} />;
}
