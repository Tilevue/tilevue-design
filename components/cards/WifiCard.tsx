"use client";

import { useState } from "react";
import { Check, Copy, Wifi } from "lucide-react";
import { Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type WifiCardProps = Omit<BaseCard, "href"> & {
  network: string;
  password: string;
  label?: string;
};

/** Guest Wi-Fi: network + password, click to copy the password. */
export function WifiCard({ network, password, label = "Free Wi-Fi", ...card }: WifiCardProps) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card {...card} hover={card.hover ?? "bg-strong"} layout="p-0">
      <button onClick={copy} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
        <CardTop
          left={<CardIcon icon={<Wifi strokeWidth={1.75} />} />}
          right={<CardIcon icon={copied ? <Check strokeWidth={1.75} /> : <Copy strokeWidth={1.75} />} />}
        />
        <div className="space-y-1 text-sm">
          <Badge>{copied ? "Password copied" : label}</Badge>
          <p className="truncate">{network}</p>
          <p className="truncate font-mono text-muted">{password}</p>
        </div>
      </button>
    </Card>
  );
}
