import { Heart } from "lucide-react";
import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type SupportCardProps = BaseCard & {
  href: string;
  title: string;
  subtitle?: string;
  /** e.g. ["$3", "$5", "$10"] */
  amounts?: string[];
};

/** Tip jar / "Buy me a coffee" — the heart beats on hover. */
export function SupportCard({ title, subtitle, amounts = [], ...card }: SupportCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <Heart
            className="card-icon size-5 fill-red-500 text-red-500 transition-transform duration-300 ease-spring group-hover:scale-125"
            strokeWidth={1.75}
          />
        }
        right={<Arrow />}
      />
      <div className="space-y-3">
        {amounts.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {amounts.slice(0, 3).map((a, i) => (
              <span key={i} className="rounded-full bg-fill px-2.5 py-1 text-xs font-medium tabular-nums">
                {a}
              </span>
            ))}
          </div>
        )}
        <CardText title={title} subtitle={subtitle} />
      </div>
    </Card>
  );
}
