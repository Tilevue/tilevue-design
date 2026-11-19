import type { ReactNode } from "react";
import { Download, FileText } from "lucide-react";
import { Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";

export type FileCardProps = BaseCard & {
  href: string;
  name: string;
  /** e.g. "PDF · 2.4 MB" */
  detail?: string;
  icon?: ReactNode | string;
};

/** A download: CV, menu, price list, media kit… The arrow drops on hover. */
export function FileCard({ name, detail, icon = <FileText strokeWidth={1.75} />, ...card }: FileCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={<CardIcon icon={icon} />}
        right={
          <Download
            className="size-5 text-muted transition-transform duration-300 ease-spring group-hover:translate-y-0.5"
            strokeWidth={1.75}
          />
        }
      />
      <CardText title={name} subtitle={detail} />
    </Card>
  );
}
