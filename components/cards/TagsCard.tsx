import type { ReactNode } from "react";
import { Tags } from "lucide-react";
import { Arrow, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type TagsCardProps = BaseCard & {
  title: string;
  tags: string[];
  icon?: ReactNode | string;
};

/** Interests, skills, languages… as small pills. */
export function TagsCard({ title, tags, icon = <Tags strokeWidth={1.75} />, ...card }: TagsCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={card.href && <Arrow />} />
      <div className="space-y-2">
        <div className="flex max-h-[4.75rem] flex-wrap gap-1 overflow-hidden">
          {tags.map((t, i) => (
            <span key={i} className="rounded-full bg-fill px-2.5 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm">{title}</p>
      </div>
    </Card>
  );
}
