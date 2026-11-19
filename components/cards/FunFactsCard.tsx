"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type FunFactsCardProps = Omit<BaseCard, "href"> & {
  title?: string;
  facts: { text: string }[];
};

/** "Things about me" — click for the next one. */
export function FunFactsCard({ title = "Fun fact", facts, ...card }: FunFactsCardProps) {
  const [i, setI] = useState(0);
  if (!facts.length) return null;
  return (
    <Card {...card} hover={card.hover ?? "bg"} layout="p-0">
      <button onClick={() => setI((n) => (n + 1) % facts.length)} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
        <CardTop
          left={
            <span className="flex items-center gap-2 text-sm">
              <CardIcon icon={<Sparkles strokeWidth={1.75} />} /> {title}
            </span>
          }
          right={<Badge>{`${i + 1}/${facts.length}`}</Badge>}
        />
        <p key={i} className="animate-fade-up text-[17px] leading-6 tracking-[-0.01em]">
          {facts[i].text}
        </p>
        <span className="text-xs text-subtle">Tap for another</span>
      </button>
    </Card>
  );
}
