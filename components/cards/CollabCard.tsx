"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, Handshake, Mail, Send } from "lucide-react";
import { Arrow, Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { Popup } from "../Popup";

export type CollabCardProps = BaseCard & {
  title?: string;
  subtitle?: string;
  badge?: string;
  email: string;
  minBudget?: string;
  options?: string[];
  icon?: ReactNode | string;
};

const DEFAULT_OPTIONS = ["Dedicated Reel", "YouTube Integration", "Brand Ambassador", "Product Gifting"];
const BUDGET_TIERS = ["<$1,000", "$1k – $3k", "$3k – $5k", "$5k – $10k", "$10k+"];

/**
 * Brand Partnership & Sponsorship Collab Card.
 * Compact status card that launches an interactive brand proposal inquiry popup.
 */
export function CollabCard({
  title = "Work with me",
  subtitle = "Brand deals & sponsorships",
  badge = "Open for Q1",
  email,
  minBudget,
  options = DEFAULT_OPTIONS,
  icon = <Handshake strokeWidth={1.75} />,
  ...card
}: CollabCardProps) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [selectedType, setSelectedType] = useState(options[0] ?? "Dedicated Reel");
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_TIERS[1]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Brand Collab Proposal: ${brand || "Partnership"} × ${title}`);
    const bodyText = encodeURIComponent(
      `Hi,\n\nWe would love to partner with you!\n\n` +
      `Brand / Company: ${brand || "Not specified"}\n` +
      `Contact Email: ${senderEmail || "Not specified"}\n` +
      `Campaign Type: ${selectedType}\n` +
      `Estimated Budget: ${selectedBudget}\n\n` +
      `Campaign Details:\n${message || "Looking forward to hearing from you."}\n`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${bodyText}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <>
      <Card
        {...card}
        size={card.size ?? "1x1"}
        hover={card.hover ?? "bg"}
        layout="cursor-pointer p-0"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-full cursor-pointer flex-col justify-between p-4 text-left"
        >
          <CardTop
            left={<CardIcon icon={icon} />}
            right={
              <div className="flex items-center gap-1.5">
                {badge && <Badge>{badge}</Badge>}
                <Arrow />
              </div>
            }
          />

          <div className="space-y-1">
            <h3 className="font-medium text-ink leading-snug">{title}</h3>
            {subtitle && <p className="text-xs text-muted leading-tight">{subtitle}</p>}
            {minBudget && (
              <p className="pt-1 text-[11px] font-medium text-subtle">
                From {minBudget}
              </p>
            )}
          </div>
        </button>
      </Card>

      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title="Brand Collaboration"
        count={options.length}
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Check className="size-6" />
            </div>
            <h4 className="mt-3 text-base font-semibold text-ink">Proposal Composed!</h4>
            <p className="mt-1 text-sm text-muted">
              Opening your email client to send to <span className="font-medium text-ink">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 p-1 text-sm">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Brand / Agency Name
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Acme Studio, Sézane"
                className="w-full rounded-xl bg-fill px-3 py-2 text-ink outline-none transition-colors focus:ring-1 focus:ring-ink/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="partnership@brand.com"
                className="w-full rounded-xl bg-fill px-3 py-2 text-ink outline-none transition-colors focus:ring-1 focus:ring-ink/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Campaign Format
              </label>
              <div className="flex flex-wrap gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedType(opt)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${selectedType === opt
                        ? "bg-ink text-page"
                        : "bg-fill text-muted hover:text-ink"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Estimated Budget Range
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedBudget(tier)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${selectedBudget === tier
                        ? "bg-ink text-page"
                        : "bg-fill text-muted hover:text-ink"
                      }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Campaign Brief / Message (optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about the launch date, target deliverables, or vision…"
                className="w-full resize-none rounded-xl bg-fill px-3 py-2 text-ink outline-none transition-colors focus:ring-1 focus:ring-ink/20"
              />
            </div>

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink font-medium text-page transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Send className="size-4" />
              Send Proposal via Email
            </button>
          </form>
        )}
      </Popup>
    </>
  );
}
