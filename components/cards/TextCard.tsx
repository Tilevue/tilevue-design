import type { ReactNode } from "react";
import { AlignLeft } from "lucide-react";
import { Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type TextCardProps = BaseCard & {
  text: string;
  avatar?: string;
  /** Top-left icon (image path or React node). Default: lines icon. */
  icon?: ReactNode | string;
};

/** Short bio / note with an optional avatar in the corner. */
export function TextCard({ text, avatar, icon = <AlignLeft strokeWidth={1.75} />, ...card }: TextCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={<CardIcon icon={icon} />}
        right={avatar && <img src={avatar} alt="" className="size-5 rounded-full object-cover" />}
      />
      <p className="text-sm">{text}</p>
    </Card>
  );
}
