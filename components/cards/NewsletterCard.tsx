"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUp, Check, Mail } from "lucide-react";
import { Badge, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type NewsletterCardProps = BaseCard & {
  icon: ReactNode | string;
  title: string;
  description: string;
  subscribers?: string;
  /** Form endpoint (POST, field "email"). Without it the form only shows the success state. */
  action?: string;
  placeholder?: string;
  successText?: string;
  errorText?: string;
};

export function NewsletterCard({
  icon,
  title,
  description,
  subscribers,
  action,
  placeholder = "name@email.com",
  successText = "Thanks for subscribing!",
  errorText = "Something went wrong, try again",
  ...card
}: NewsletterCardProps) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    try {
      if (action) {
        const res = await fetch(action, { method: "POST", body: new FormData(e.currentTarget) });
        if (!res.ok) throw new Error(res.statusText);
      }
      setDone(true);
    } catch {
      setError(true);
    }
  }

  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={subscribers && <Badge>{subscribers}</Badge>} />
      <div className="space-y-3">
        <CardText title={title} subtitle={error ? <span className="text-red-500">{errorText}</span> : description} />
        <form onSubmit={submit} className="flex h-10 items-center gap-2 rounded-full bg-fill pr-1 pl-3">
          <Mail className="size-4 shrink-0 text-subtle" strokeWidth={1.75} />
          <input
            type="email"
            name="email"
            required
            disabled={done}
            placeholder={done ? successText : placeholder}
            className="min-w-0 flex-1 bg-transparent text-base sm:text-sm outline-none placeholder:text-subtle"
          />
          <button
            aria-label="Subscribe"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card text-muted shadow-card"
          >
            {done ? <Check className="size-4" /> : <ArrowUp className="size-4" strokeWidth={1.75} />}
          </button>
        </form>
      </div>
    </Card>
  );
}
