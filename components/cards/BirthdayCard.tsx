"use client";

import { useEffect, useState } from "react";
import type { CardActivity, Note } from "@/lib/store";
import { Badge, Card, CardText, CardTop, type BaseCard } from "../Card";
import { NotesPopup } from "./GuestbookCard";

export type BirthdayCardProps = Omit<BaseCard, "href"> & {
  /** Any date with the right month and day; only month + day are used (the year/age is never shown). */
  date: string;
  title?: string;
  /** Filled in by the page (not saved with the card): wishes are guestbook notes on this card */
  id?: string;
  page?: string;
  activity?: CardActivity;
  canModerate?: boolean;
};

const COLORS = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];

/** Days until your birthday — confetti on the day. Tap → visitors send wishes. */
export function BirthdayCard({ date, title = "My birthday", id, page, activity, canModerate, ...card }: BirthdayCardProps) {
  const [days, setDays] = useState<number | null>(null); // computed in the browser (visitor's "today")
  const [wishes, setWishes] = useState<Note[]>(activity?.notes ?? []);
  const [open, setOpen] = useState(false);
  const m = Number(date.slice(5, 7)) - 1;
  const d = Number(date.slice(8, 10));

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let next = new Date(now.getFullYear(), m, d);
    if (next < today) next = new Date(now.getFullYear() + 1, m, d);
    setDays(Math.round((next.getTime() - today.getTime()) / 86_400_000));
  }, [m, d]);

  const label = new Date(2000, m, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const isToday = days === 0;

  return (
    <>
      <Card {...card} layout="p-0">
        <button onClick={() => setOpen(true)} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
          {isToday && (
            <span aria-hidden className="pointer-events-none absolute inset-0">
              {Array.from({ length: 18 }, (_, i) => (
                <span
                  key={i}
                  className="absolute top-0 h-2 w-1 animate-confetti rounded-sm"
                  style={{ left: `${(i * 37) % 100}%`, background: COLORS[i % COLORS.length], animationDelay: `${(i % 6) * 0.35}s` }}
                />
              ))}
            </span>
          )}
          <CardTop
            left={<span className="block text-[32px] leading-none transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:rotate-6">🎂</span>}
            right={<Badge>{label}</Badge>}
          />
          <span className="relative block space-y-2">
            <span className="block text-[32px] leading-none font-semibold tracking-[-0.02em] tabular-nums">
              {days === null ? " " : isToday ? "Today! 🎉" : days === 1 ? "Tomorrow" : `${days} days`}
            </span>
            <CardText title={title} subtitle={`🎉 Send wishes${wishes.length ? ` · ${wishes.length}` : ""}`} />
          </span>
        </button>
      </Card>

      <NotesPopup
        open={open}
        onClose={() => setOpen(false)}
        title="Birthday wishes"
        {...{ id, page, canModerate }}
        notes={wishes}
        setNotes={setWishes}
        words={{ thanks: "Wish sent! 🎂", placeholder: "Happy birthday! …", send: "Send wishes", sending: "Sending…" }}
      />
    </>
  );
}
