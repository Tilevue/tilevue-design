"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Arrow, Card, type BaseCard } from "../Card";

export type CodeCardProps = BaseCard & {
  code: string;
  /** Shown in the window bar, e.g. "hello.ts" */
  filename?: string;
};

/** A tiny code window — a favourite snippet, a terminal command… with 1-click copy. */
export function CodeCard({ code, filename, ...card }: CodeCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Card {...card} layout="flex flex-col p-2">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-page shadow-inner">
        <div className="flex items-center gap-1.5 px-3 pt-3 pb-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          {filename && (
            <span className="ml-1.5 truncate font-mono text-[11px] font-medium text-subtle">
              {filename}
            </span>
          )}
          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={copy}
              className="rounded p-1 text-subtle hover:bg-fill hover:text-ink transition-colors cursor-pointer"
              title="Copy code"
              aria-label="Copy code"
            >
              {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
            </button>
            {card.href && <Arrow className="size-3.5 text-muted" />}
          </div>
        </div>
        <pre className="flex-1 overflow-auto px-3.5 pb-3 font-mono text-[11px] leading-[18px] text-ink/80 whitespace-pre-wrap break-words">
          <code>{code}</code>
        </pre>
      </div>
    </Card>
  );
}
