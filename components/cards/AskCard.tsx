"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, MessageCircleQuestion } from "lucide-react";
import { Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type AskCardProps = Omit<BaseCard, "href"> & {
  /** Where questions go (opens the visitor's email app — nothing is stored) */
  email: string;
  title?: string;
  placeholder?: string;
};

/** "Ask me anything": the question opens in the visitor's email app, addressed to you. */
export function AskCard({ email, title = "Ask me anything", placeholder = "Your question…", ...card }: AskCardProps) {
  const [q, setQ] = useState("");
  function send(e: FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    location.href = `mailto:${email}?subject=${encodeURIComponent("A question for you")}&body=${encodeURIComponent(q.trim())}`;
  }
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={<MessageCircleQuestion strokeWidth={1.75} />} />} />
      <div className="space-y-3">
        <CardText title={title} subtitle="I read every one" />
        <form onSubmit={send} className="flex h-10 items-center gap-1 rounded-full bg-fill pr-1 pl-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            maxLength={500}
            aria-label="Your question"
            className="min-w-0 flex-1 bg-transparent text-base sm:text-sm outline-none placeholder:text-subtle"
          />
          <button aria-label="Send" className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card text-muted shadow-card">
            <ArrowUp className="size-4" strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </Card>
  );
}
