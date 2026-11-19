import { Droplet } from "lucide-react";
import { Card, CardTop, type BaseCard } from "../Card";

type Plant = { emoji?: string; name: string; note?: string };

export type PlantsCardProps = BaseCard & {
  title?: string;
  plants: Plant[];
};

/** Your plants and when they want water — the leaves sway on hover. */
export function PlantsCard({ title = "My plants", plants, ...card }: PlantsCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{title}</span>} right={<Droplet className="size-4 text-sky-500" strokeWidth={1.75} />} />
      <ul className="space-y-1.5 text-sm">
        {plants.slice(0, 3).map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="origin-bottom text-lg leading-none transition-transform duration-500 ease-spring group-hover:rotate-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {p.emoji || "🌿"}
            </span>
            <span className="min-w-0 flex-1 truncate">{p.name}</span>
            {p.note && <span className="shrink-0 text-xs text-muted">{p.note}</span>}
          </li>
        ))}
      </ul>
    </Card>
  );
}
