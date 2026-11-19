"use client";

import { useState } from "react";
import { Check, Download, Mail, Phone, UserRound } from "lucide-react";
import { Arrow, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type VcardCardProps = BaseCard & {
  name: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  note?: string;
};

function triggerVcfDownload(props: VcardCardProps) {
  const parts = props.name.trim().split(/\s+/);
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
  const firstName = parts[0] || "";
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${props.name}`,
    `N:${lastName};${firstName};;;`,
    props.company ? `ORG:${props.company}` : "",
    props.title ? `TITLE:${props.title}` : "",
    props.phone ? `TEL;TYPE=CELL:${props.phone}` : "",
    props.email ? `EMAIL;TYPE=INTERNET:${props.email}` : "",
    props.note ? `NOTE:${props.note}` : "NOTE:Saved via Tilevue",
    "END:VCARD",
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([lines], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${props.name.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "contact"}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Contact card: tap to download a .vcf contact directly into phone address books. */
export function VcardCard({ name, title, company, phone, email, avatar, note, ...card }: VcardCardProps) {
  const [saved, setSaved] = useState(false);
  const wide = (card.size ?? "1x1") !== "1x1";

  const onSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerVcfDownload({ name, title, company, phone, email, avatar, note });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const subtitle = [title, company].filter(Boolean).join(" · ");

  return (
    <Card
      {...card}
      hover={card.hover ?? "bg"}
      layout="flex flex-col justify-between p-4 cursor-pointer"
      onClick={onSave}
    >
      <CardTop
        left={
          avatar ? (
            <img src={avatar} alt="" className="size-10 rounded-full object-cover" />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-fill text-xs font-medium text-ink">
              {initials || <UserRound className="size-5 text-muted" strokeWidth={1.75} />}
            </span>
          )
        }
        right={
          <button
            type="button"
            onClick={onSave}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200 ease-smooth ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-fill text-ink group-hover:bg-ink group-hover:text-page"
            }`}
          >
            {saved ? (
              <>
                <Check className="size-3.5" /> Saved
              </>
            ) : (
              <>
                <Download className="size-3.5" strokeWidth={1.75} /> Save
              </>
            )}
          </button>
        }
      />

      {wide && (phone || email) && (
        <div className="flex flex-wrap gap-1.5 text-xs text-muted">
          {phone && (
            <span className="flex items-center gap-1 rounded-full bg-fill px-2.5 py-0.5 tabular-nums text-ink">
              <Phone className="size-3 text-muted" /> {phone}
            </span>
          )}
          {email && (
            <span className="flex items-center gap-1 rounded-full bg-fill px-2.5 py-0.5 text-ink">
              <Mail className="size-3 text-muted" /> {email}
            </span>
          )}
        </div>
      )}

      <CardText
        title={name}
        subtitle={subtitle || phone || email}
      />
    </Card>
  );
}
