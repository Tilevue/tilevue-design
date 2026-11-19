"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type EmailCardProps = BaseCard & {
  email: string;
  /** Top-left icon (image path or React node). Default: envelope. */
  icon?: ReactNode | string;
  /** Text shown for 2s after copying. */
  copiedTitle?: string;
  copiedSubtitle?: string;
};

/** Click to copy the email address to the clipboard. */
export function EmailCard({
  email,
  icon = <Mail strokeWidth={1.75} />,
  copiedTitle = "Copied email",
  copiedSubtitle = "To clipboard",
  ...card
}: EmailCardProps) {
  const [copied, setCopied] = useState(false);
  const [user, domain] = email.split("@");

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card {...card} hover={card.hover ?? "bg-strong"} layout="cursor-pointer p-0">
      <button onClick={copy} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
        <CardTop
          left={<CardIcon icon={icon} />}
          right={<CardIcon icon={copied ? <Check strokeWidth={1.75} /> : <Copy strokeWidth={1.75} />} />}
        />
        {copied ? (
          <CardText title={copiedTitle} subtitle={copiedSubtitle} />
        ) : (
          <CardText title={user} subtitle={`@${domain}`} />
        )}
      </button>
    </Card>
  );
}
