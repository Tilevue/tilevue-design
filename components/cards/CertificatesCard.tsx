import { BadgeCheck } from "lucide-react";
import { Arrow, Card, CardTop, type BaseCard } from "../Card";

type Cert = { name: string; issuer?: string; year?: string };

export type CertificatesCardProps = BaseCard & {
  title: string;
  certificates: Cert[];
};

/** Certifications, licences, awards — with a verified-style badge. */
export function CertificatesCard({ title, certificates, ...card }: CertificatesCardProps) {
  const wide = (card.size ?? "1x1") !== "1x1";
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{title}</span>} right={card.href && <Arrow />} />
      <ul className={`gap-x-4 gap-y-2.5 text-sm ${wide ? "grid grid-cols-2" : "space-y-2.5"}`}>
        {certificates.slice(0, wide ? 4 : 3).map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-300 ease-spring group-hover:scale-110" />
            <span className="min-w-0 leading-5">
              <span className="block truncate">{c.name}</span>
              {(c.issuer || c.year) && (
                <span className="block truncate text-xs text-muted">{[c.issuer, c.year].filter(Boolean).join(" · ")}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
