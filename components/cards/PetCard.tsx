import { PawPrint } from "lucide-react";
import { Card, CardText, CardTop, type BaseCard } from "../Card";

export type PetCardProps = BaseCard & {
  photo: string;
  name: string;
  /** e.g. "Golden retriever · 3" */
  about?: string;
  /** e.g. "Steals socks" */
  fact?: string;
};

/** Your pet. The photo tilts on hover, like the podcast cover. */
export function PetCard({ photo, name, about, fact, ...card }: PetCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="relative block size-16">
            <img
              src={photo}
              alt={name}
              className="size-full rounded-full object-cover shadow-card transition-transform duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-105"
            />
            <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-card shadow-card">
              <PawPrint className="size-3.5 text-amber-600" />
            </span>
          </span>
        }
      />
      <div className="space-y-1">
        <CardText title={name} subtitle={about} />
        {fact && <p className="line-clamp-2 text-xs text-subtle">“{fact}”</p>}
      </div>
    </Card>
  );
}
